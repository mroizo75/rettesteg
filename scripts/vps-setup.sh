#!/bin/bash
# rettesteg.no — VPS-oppsett (kjøres én gang som root på Ubuntu 22.04/24.04)
# Bruk: bash vps-setup.sh

set -euo pipefail

DOMAIN="rettesteg.no"
APP_DIR="/opt/rettesteg"
DEPLOY_USER="deploy"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  rettesteg.no — VPS oppsett"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── 1. Systemoppdatering ───────────────────────────────────────────────────
echo "▶ Oppdaterer system..."
apt-get update -qq && apt-get upgrade -y -qq

# ── 2. Docker ─────────────────────────────────────────────────────────────
if ! command -v docker &>/dev/null; then
  echo "▶ Installerer Docker..."
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
else
  echo "✓ Docker allerede installert"
fi

# ── 3. Deploy-bruker ──────────────────────────────────────────────────────
if ! id "$DEPLOY_USER" &>/dev/null; then
  echo "▶ Oppretter bruker: $DEPLOY_USER..."
  useradd -m -s /bin/bash "$DEPLOY_USER"
  usermod -aG docker "$DEPLOY_USER"
  mkdir -p /home/$DEPLOY_USER/.ssh
  chmod 700 /home/$DEPLOY_USER/.ssh
  echo "  → Lim inn deploy-brukerens public SSH-nøkkel under /home/$DEPLOY_USER/.ssh/authorized_keys"
else
  echo "✓ Bruker $DEPLOY_USER finnes allerede"
fi

# ── 4. App-mappe ──────────────────────────────────────────────────────────
echo "▶ Setter opp $APP_DIR..."
mkdir -p "$APP_DIR"
chown $DEPLOY_USER:$DEPLOY_USER "$APP_DIR"

# ── 5. Klon repo ──────────────────────────────────────────────────────────
if [ ! -d "$APP_DIR/.git" ]; then
  echo "▶ Kloner repo..."
  sudo -u $DEPLOY_USER git clone https://github.com/mroizo75/rettesteg.git "$APP_DIR"
else
  echo "✓ Repo allerede klonet"
fi

# ── 6. Miljøfil ───────────────────────────────────────────────────────────
if [ ! -f "$APP_DIR/.env.production" ]; then
  cp "$APP_DIR/.env.production.example" "$APP_DIR/.env.production"
  echo ""
  echo "⚠️  VIKTIG: Fyll inn ekte verdier i $APP_DIR/.env.production"
  echo "   nano $APP_DIR/.env.production"
  echo ""
fi

# ── 7. Certbot (Let's Encrypt) ────────────────────────────────────────────
if ! command -v certbot &>/dev/null; then
  echo "▶ Installerer Certbot..."
  apt-get install -y -qq certbot
else
  echo "✓ Certbot allerede installert"
fi

# ── 8. Hent SSL-sertifikat ────────────────────────────────────────────────
if [ ! -d "/etc/letsencrypt/live/$DOMAIN" ]; then
  echo "▶ Henter SSL-sertifikat for $DOMAIN..."
  # Stopp evt. port-80-tjenester midlertidig
  certbot certonly --standalone \
    -d "$DOMAIN" \
    -d "www.$DOMAIN" \
    --non-interactive \
    --agree-tos \
    --email hei@rettesteg.no \
    --no-eff-email
  echo "✓ SSL-sertifikat hentet"
else
  echo "✓ SSL-sertifikat finnes allerede"
fi

# ── 9. Certbot auto-fornyelse ─────────────────────────────────────────────
echo "▶ Setter opp automatisk sertifikatfornyelse..."
(crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --deploy-hook 'docker exec $(docker ps -qf name=nginx) nginx -s reload'") | sort -u | crontab -

# ── 10. Brannmur ──────────────────────────────────────────────────────────
if command -v ufw &>/dev/null; then
  echo "▶ Konfigurerer UFW-brannmur..."
  ufw allow OpenSSH
  ufw allow 80/tcp
  ufw allow 443/tcp
  ufw --force enable
fi

# ── 11. Første bygg og start ──────────────────────────────────────────────
echo "▶ Bygger og starter applikasjonen..."
cd "$APP_DIR"
sudo -u $DEPLOY_USER docker compose build app
sudo -u $DEPLOY_USER docker compose up -d

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅  VPS-oppsett fullført!"
echo ""
echo "Neste steg:"
echo "  1. Oppdater .env.production med live-verdier"
echo "     nano $APP_DIR/.env.production"
echo ""
echo "  2. Pek DNS for $DOMAIN til denne serverens IP"
echo "     A-post: @ → $(curl -s ifconfig.me)"
echo "     A-post: www → $(curl -s ifconfig.me)"
echo ""
echo "  3. Legg til GitHub Secrets for auto-deploy:"
echo "     VPS_HOST = $(curl -s ifconfig.me)"
echo "     VPS_USER = $DEPLOY_USER"
echo "     VPS_SSH_KEY = (innhold fra deploy-brukerens private SSH-nøkkel)"
echo "     NEXT_PUBLIC_SUPABASE_URL = ..."
echo "     NEXT_PUBLIC_SUPABASE_ANON_KEY = ..."
echo "     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = ..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
