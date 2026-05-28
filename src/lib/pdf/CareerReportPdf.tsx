import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import type { RiasecScores, Career } from '@/lib/supabase/types';
import { riasecDescriptions } from '@/lib/assessments/scoring';

// ─── Farger ─────────────────────────────────────────────────────────────────
const BRAND   = '#7c3aed';
const BRAND2  = '#a78bfa';
const LIME    = '#84cc16';
const GRAY100 = '#f3f4f6';
const GRAY200 = '#e5e7eb';
const GRAY500 = '#6b7280';
const GRAY700 = '#374151';
const GRAY900 = '#111827';
const WHITE   = '#ffffff';

const RIASEC_COLORS: Record<string, string> = {
  R: '#3b82f6',
  I: '#8b5cf6',
  A: '#ec4899',
  S: '#10b981',
  E: '#f59e0b',
  C: '#6b7280',
};

const MATCH_COLORS = ['#7c3aed','#8b5cf6','#a78bfa','#c4b5fd','#ddd6fe',
                      '#7c3aed','#8b5cf6','#a78bfa','#c4b5fd','#ddd6fe'];

// ─── Stiler ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: WHITE,
    paddingTop: 0,
    paddingBottom: 48,
    paddingHorizontal: 0,
    fontSize: 10,
    color: GRAY900,
  },

  // ── Topptekst ──
  pageHeader: {
    backgroundColor: BRAND,
    paddingHorizontal: 36,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadgeText: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: BRAND,
  },
  logoText: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
  },
  logoAccent: {
    color: LIME,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerLabel: {
    fontSize: 8,
    color: '#ddd6fe',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerDate: {
    fontSize: 9,
    color: WHITE,
    marginTop: 2,
  },

  body: {
    paddingHorizontal: 36,
  },

  // ── Cover-seksjon ──
  cover: {
    backgroundColor: BRAND,
    paddingHorizontal: 36,
    paddingTop: 56,
    paddingBottom: 48,
    marginBottom: 0,
  },
  coverLabel: {
    fontSize: 9,
    color: '#c4b5fd',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  coverTitle: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
    marginBottom: 6,
  },
  coverName: {
    fontSize: 16,
    color: '#ddd6fe',
    marginBottom: 4,
  },
  coverDate: {
    fontSize: 10,
    color: '#a78bfa',
    marginBottom: 32,
  },
  coverCodeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  coverCodePill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  coverCodeText: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
    letterSpacing: 1,
  },
  coverCodeLabel: {
    fontSize: 8,
    color: '#c4b5fd',
    marginTop: 2,
    textAlign: 'center',
  },

  // ── Seksjonstittel ──
  section: {
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: BRAND2,
    paddingBottom: 6,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BRAND,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: BRAND,
  },

  // ── RIASEC bars ──
  riasecRow: {
    marginBottom: 10,
  },
  riasecTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  riasecLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  riasecDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  riasecLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: GRAY700,
  },
  riasecKey: {
    fontSize: 9,
    color: GRAY500,
  },
  riasecBadge: {
    fontSize: 7,
    color: WHITE,
    backgroundColor: '#10b981',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
  },
  riasecScore: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  barTrack: {
    height: 8,
    backgroundColor: GRAY100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },
  riasecDesc: {
    fontSize: 8,
    color: GRAY500,
    marginTop: 3,
    lineHeight: 1.4,
  },

  // ── Yrker ──
  careerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    padding: 10,
    backgroundColor: GRAY100,
    borderRadius: 8,
    gap: 10,
  },
  careerIndex: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  careerIndexText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
  },
  careerContent: {
    flex: 1,
  },
  careerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  careerTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: GRAY900,
  },
  matchPill: {
    fontSize: 8,
    color: WHITE,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  sectorPill: {
    fontSize: 8,
    color: GRAY700,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GRAY200,
    backgroundColor: WHITE,
  },
  careerDesc: {
    fontSize: 8.5,
    color: GRAY500,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  careerMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  careerMetaItem: {
    fontSize: 8,
    color: GRAY500,
  },
  careerBarTrack: {
    height: 4,
    backgroundColor: GRAY200,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 6,
  },
  careerBarFill: {
    height: 4,
    borderRadius: 2,
  },

  // ── Utdanning ──
  eduRow: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: GRAY200,
    borderRadius: 8,
    backgroundColor: WHITE,
  },
  eduTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  eduTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: GRAY900,
  },
  eduMeta: {
    fontSize: 8,
    color: GRAY500,
    marginBottom: 4,
  },
  eduDesc: {
    fontSize: 8.5,
    color: GRAY500,
    lineHeight: 1.4,
  },
  eduTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 6,
  },
  eduTag: {
    fontSize: 7.5,
    color: GRAY700,
    backgroundColor: GRAY100,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  // ── Bunntekst ──
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 36,
    right: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: GRAY200,
    paddingTop: 8,
  },
  footerBrand: {
    fontSize: 8,
    color: BRAND,
    fontFamily: 'Helvetica-Bold',
  },
  footerNote: {
    fontSize: 7.5,
    color: GRAY500,
  },
  footerPage: {
    fontSize: 8,
    color: GRAY500,
  },

  // ── Fritekst-notat ──
  infoBox: {
    backgroundColor: '#f5f3ff',
    borderLeftWidth: 3,
    borderLeftColor: BRAND,
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  infoBoxText: {
    fontSize: 8.5,
    color: GRAY700,
    lineHeight: 1.4,
  },
});

// ─── Typer ───────────────────────────────────────────────────────────────────
interface PdfData {
  userName: string;
  date: string;
  riasecScores: RiasecScores;
  topCareers: Array<{ career: Career; score: number }>;
  topEducation: Array<{
    id: string;
    title_no: string;
    level: string;
    duration_years: number;
    institution_type: string;
    description_no: string;
    subject_list: string[];
  }>;
  isPro: boolean;
}

// ─── Hjelpere ────────────────────────────────────────────────────────────────
function riasecCode(scores: RiasecScores): string {
  return (Object.entries(scores) as [keyof RiasecScores, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k)
    .join('-');
}

// ─── PDF-dokument ─────────────────────────────────────────────────────────────
export function CareerReportPdf({
  userName, date, riasecScores, topCareers, topEducation, isPro,
}: PdfData) {
  const code = riasecCode(riasecScores);
  const sortedRiasec = (Object.entries(riasecScores) as [keyof RiasecScores, number][])
    .sort((a, b) => b[1] - a[1]);
  const maxRiasec = Math.max(...sortedRiasec.map(([, v]) => v), 1);
  const maxCareer = Math.max(...topCareers.map((c) => c.score), 1);

  return (
    <Document
      title={`Karriererapport — ${userName}`}
      author="rettesteg.no"
      subject="RIASEC Karriereveiledning"
    >
      {/* ════════════════════════════════════════════════════════ SIDE 1 */}
      <Page size="A4" style={s.page}>
        {/* Cover-seksjon */}
        <View style={s.cover}>
          <Text style={s.coverLabel}>Karriererapport</Text>
          <Text style={s.coverTitle}>Din fremtid{'\n'}starter her.</Text>
          <Text style={s.coverName}>{userName}</Text>
          <Text style={s.coverDate}>{date}</Text>

          {/* RIASEC-kode-pillsene */}
          <View style={s.coverCodeRow}>
            {code.split('-').map((k, i) => (
              <View key={k} style={s.coverCodePill}>
                <Text style={s.coverCodeText}>{k}</Text>
                <Text style={s.coverCodeLabel}>
                  {riasecDescriptions[k as keyof RiasecScores]?.label ?? k}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Info-boks */}
        <View style={[s.body, { marginTop: 28 }]}>
          <View style={s.infoBox}>
            <Text style={s.infoBoxText}>
              Denne rapporten er generert av rettesteg.no basert på din RIASEC-interesseprofil.
              RIASEC er den mest brukte vitenskapelige karrieremodellen i verden, utviklet av
              psykolog John Holland. Resultatet er personlig og veiledende — bruk det som
              et utgangspunkt for samtale med rådgiver eller foresatte.
            </Text>
          </View>

          {/* ── RIASEC-profil ── */}
          <View style={s.section}>
            <View style={s.sectionTitleRow}>
              <View style={s.sectionDot} />
              <Text style={s.sectionTitle}>Din RIASEC-interesseprofil</Text>
            </View>

            {sortedRiasec.map(([key, score], idx) => {
              const desc = riasecDescriptions[key];
              const color = RIASEC_COLORS[key] ?? BRAND;
              const barWidth = (score / maxRiasec) * 100;
              return (
                <View key={key} style={s.riasecRow}>
                  <View style={s.riasecTopRow}>
                    <View style={s.riasecLabelGroup}>
                      <View style={[s.riasecDot, { backgroundColor: color }]} />
                      <Text style={s.riasecLabel}>{desc.label}</Text>
                      <Text style={s.riasecKey}>({key})</Text>
                      {idx === 0 && <Text style={s.riasecBadge}>Sterkest</Text>}
                    </View>
                    <Text style={[s.riasecScore, { color }]}>{score}%</Text>
                  </View>
                  <View style={s.barTrack}>
                    <View style={[s.barFill, { width: `${barWidth}%`, backgroundColor: color }]} />
                  </View>
                  <Text style={s.riasecDesc}>{desc.no}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={s.footer} fixed>
          <Text style={s.footerBrand}>rettesteg.no</Text>
          <Text style={s.footerNote}>Kurs og Kompetansesystemer AS · org. nr. 925 897 019</Text>
          <Text
            style={s.footerPage}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>

      {/* ════════════════════════════════════════════════════════ SIDE 2 */}
      <Page size="A4" style={s.page}>
        <View style={s.pageHeader} fixed>
          <View style={s.logoRow}>
            <View style={s.logoBadge}>
              <Text style={s.logoBadgeText}>R</Text>
            </View>
            <Text style={s.logoText}>rettesteg<Text style={s.logoAccent}>.no</Text></Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.headerLabel}>Karriererapport</Text>
            <Text style={s.headerDate}>{userName} · {date}</Text>
          </View>
        </View>

        <View style={s.body}>
          {/* ── Yrker ── */}
          <View style={s.section}>
            <View style={s.sectionTitleRow}>
              <View style={s.sectionDot} />
              <Text style={s.sectionTitle}>
                Yrker som passer deg
                {!isPro ? '  (topp 3 — gratis plan)' : '  (topp 10 — Pro)'}
              </Text>
            </View>

            {topCareers.map(({ career, score }, idx) => {
              const color = MATCH_COLORS[idx] ?? BRAND;
              const barWidth = (score / maxCareer) * 100;
              return (
                <View key={career.id} style={s.careerRow} wrap={false}>
                  <View style={[s.careerIndex, { backgroundColor: color }]}>
                    <Text style={s.careerIndexText}>{idx + 1}</Text>
                  </View>
                  <View style={s.careerContent}>
                    <View style={s.careerTitleRow}>
                      <Text style={s.careerTitle}>{career.title_no}</Text>
                      <Text style={[s.matchPill, { backgroundColor: color }]}>
                        {score}% match
                      </Text>
                      {career.sector && (
                        <Text style={s.sectorPill}>{career.sector}</Text>
                      )}
                    </View>
                    <Text style={s.careerDesc}>{career.description_no}</Text>
                    {isPro && (
                      <View style={s.careerMeta}>
                        {career.education_level && (
                          <Text style={s.careerMetaItem}>🎓 {career.education_level}</Text>
                        )}
                        {career.salary_range && (
                          <Text style={s.careerMetaItem}>💰 {career.salary_range}</Text>
                        )}
                        {career.growth_outlook && (
                          <Text style={s.careerMetaItem}>📈 {career.growth_outlook}</Text>
                        )}
                      </View>
                    )}
                    <View style={s.careerBarTrack}>
                      <View style={[s.careerBarFill, { width: `${barWidth}%`, backgroundColor: color }]} />
                    </View>
                  </View>
                </View>
              );
            })}

            {!isPro && (
              <View style={[s.infoBox, { marginTop: 8 }]}>
                <Text style={s.infoBoxText}>
                  Oppgrader til Rettesteg Pro for å se topp 10 yrkesanbefalinger, Big Five-analyse,
                  verdikartlegging og fullstendige utdanningsveier på neste side.
                </Text>
              </View>
            )}
          </View>

          {/* ── Utdanning (Pro) ── */}
          {isPro && topEducation.length > 0 && (
            <View style={s.section}>
              <View style={s.sectionTitleRow}>
                <View style={s.sectionDot} />
                <Text style={s.sectionTitle}>Anbefalte utdanningsveier</Text>
              </View>

              {topEducation.map((edu) => (
                <View key={edu.id} style={s.eduRow} wrap={false}>
                  <View style={s.eduTitleRow}>
                    <Text style={s.eduTitle}>{edu.title_no}</Text>
                    <Text style={[s.sectorPill, { borderColor: BRAND2 }]}>{edu.level}</Text>
                  </View>
                  <Text style={s.eduMeta}>
                    {edu.level} · {edu.duration_years} år · {edu.institution_type}
                  </Text>
                  <Text style={s.eduDesc}>{edu.description_no}</Text>
                  {edu.subject_list.length > 0 && (
                    <View style={s.eduTagRow}>
                      {edu.subject_list.slice(0, 8).map((subj: string) => (
                        <Text key={subj} style={s.eduTag}>{subj}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={s.footer} fixed>
          <Text style={s.footerBrand}>rettesteg.no</Text>
          <Text style={s.footerNote}>Kurs og Kompetansesystemer AS · org. nr. 925 897 019</Text>
          <Text
            style={s.footerPage}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}
