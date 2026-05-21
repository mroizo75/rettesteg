-- rettesteg.no — Seed Data: Careers, Education Programs, Assessment Questions

-- ============================================================
-- CAREERS (utvalg av norske yrker med RIASEC-koder)
-- ============================================================
insert into public.careers (slug, title_no, title_en, description_no, description_en, riasec_primary, riasec_secondary, riasec_codes, education_level, education_years, sector, salary_range, growth_outlook) values
-- Realistic (R)
('elektriker', 'Elektriker', 'Electrician', 'Installerer og vedlikeholder elektriske anlegg i bygninger og industri.', 'Installs and maintains electrical systems in buildings and industry.', 'R', 'C', ARRAY['R','C','I'], 'Fagbrev', 4, 'Privat/Offentlig', '550 000 – 750 000 kr/år', 'Høy vekst'),
('ror-og-anleggsmaskin-forer', 'Anleggsmaskinførere', 'Construction Equipment Operator', 'Betjener maskiner på byggeplasser og anlegg.', 'Operates machinery on construction sites.', 'R', 'E', ARRAY['R','E'], 'Fagbrev', 4, 'Privat', '480 000 – 680 000 kr/år', 'Stabil'),
('snekker', 'Tømrer/Snekker', 'Carpenter', 'Bygger og reparerer strukturer i tre for hus og næringsbygg.', 'Builds and repairs wooden structures for residential and commercial buildings.', 'R', 'I', ARRAY['R','I','C'], 'Fagbrev', 4, 'Privat', '500 000 – 720 000 kr/år', 'Stabil'),
('bioteknolog', 'Bioteknolog', 'Biotechnologist', 'Forsker på biologiske systemer for medisin, matproduksjon og miljø.', 'Researches biological systems for medicine, food production and environment.', 'I', 'R', ARRAY['I','R','C'], 'Master', 5, 'Offentlig/Forskning', '600 000 – 900 000 kr/år', 'Høy vekst'),

-- Investigative (I)
('lege', 'Lege', 'Medical Doctor', 'Diagnostiserer og behandler sykdommer, og jobber med forebyggende helse.', 'Diagnoses and treats diseases, and works with preventive health.', 'I', 'S', ARRAY['I','S','C'], 'Profesjonsstudium', 6, 'Offentlig', '900 000 – 1 500 000 kr/år', 'Høy vekst'),
('ingeniør-it', 'IT-ingeniør', 'IT Engineer', 'Utvikler og drifter programvare, nettverk og IT-systemer.', 'Develops and operates software, networks and IT systems.', 'I', 'C', ARRAY['I','C','R'], 'Bachelor', 3, 'Privat', '650 000 – 1 100 000 kr/år', 'Svært høy vekst'),
('forsker', 'Forsker', 'Researcher', 'Utforsker nye kunnskapsområder innen vitenskap og teknologi.', 'Explores new knowledge areas in science and technology.', 'I', 'A', ARRAY['I','A','C'], 'Doktorgrad', 8, 'Offentlig/Forskning', '600 000 – 950 000 kr/år', 'Stabil'),
('økonom', 'Økonom', 'Economist', 'Analyserer og rådgir om økonomi, finans og ressursbruk.', 'Analyzes and advises on economics, finance and resource use.', 'I', 'E', ARRAY['I','E','C'], 'Master', 5, 'Privat/Offentlig', '700 000 – 1 200 000 kr/år', 'Stabil'),
('dataingeniør', 'Dataingeniør', 'Data Engineer', 'Bygger datainfrastruktur og pipelines for analyse og kunstig intelligens.', 'Builds data infrastructure and pipelines for analytics and AI.', 'I', 'C', ARRAY['I','C','R'], 'Bachelor', 3, 'Privat', '700 000 – 1 200 000 kr/år', 'Svært høy vekst'),

-- Artistic (A)
('grafisk-designer', 'Grafisk designer', 'Graphic Designer', 'Lager visuelle konsepter, logoer og kommunikasjonsmateriell.', 'Creates visual concepts, logos and communication materials.', 'A', 'E', ARRAY['A','E','I'], 'Bachelor', 3, 'Privat', '450 000 – 700 000 kr/år', 'Stabil'),
('arkitekt', 'Arkitekt', 'Architect', 'Planlegger og designer bygninger, interiør og uterom.', 'Plans and designs buildings, interiors and outdoor spaces.', 'A', 'I', ARRAY['A','I','R'], 'Master', 5, 'Privat', '600 000 – 950 000 kr/år', 'Stabil'),
('journalist', 'Journalist', 'Journalist', 'Undersøker og rapporterer nyheter og aktuelle saker.', 'Investigates and reports news and current affairs.', 'A', 'S', ARRAY['A','S','E'], 'Bachelor', 3, 'Privat/Offentlig', '450 000 – 700 000 kr/år', 'Synkende'),
('webutvikler', 'Webutvikler', 'Web Developer', 'Designer og utvikler nettsider og nettbaserte applikasjoner.', 'Designs and develops websites and web-based applications.', 'A', 'I', ARRAY['A','I','C'], 'Bachelor', 3, 'Privat', '600 000 – 1 000 000 kr/år', 'Høy vekst'),
('musiker', 'Musiker/Artist', 'Musician/Artist', 'Fremfører, komponerer eller produserer musikk profesjonelt.', 'Performs, composes or produces music professionally.', 'A', 'S', ARRAY['A','S'], 'Variert', 3, 'Privat', '300 000 – 800 000 kr/år', 'Stabil'),

-- Social (S)
('sykepleier', 'Sykepleier', 'Nurse', 'Yter pleie og omsorg til pasienter i sykehus og helseinstitusjoner.', 'Provides care and treatment to patients in hospitals and health institutions.', 'S', 'I', ARRAY['S','I','C'], 'Bachelor', 3, 'Offentlig', '550 000 – 750 000 kr/år', 'Svært høy vekst'),
('laerer', 'Lærer', 'Teacher', 'Underviser og veileder elever i skolen, fra barnetrinn til videregående.', 'Teaches and guides students in school, from primary to secondary level.', 'S', 'A', ARRAY['S','A','I'], 'Master', 5, 'Offentlig', '480 000 – 700 000 kr/år', 'Høy vekst'),
('psykolog', 'Psykolog', 'Psychologist', 'Utreder og behandler psykiske lidelser og utfordringer.', 'Assesses and treats mental health conditions and challenges.', 'S', 'I', ARRAY['S','I','A'], 'Profesjonsstudium', 6, 'Offentlig', '700 000 – 1 100 000 kr/år', 'Høy vekst'),
('sosionom', 'Sosionom', 'Social Worker', 'Hjelper enkeltpersoner og familier med sosiale og personlige problemer.', 'Helps individuals and families with social and personal problems.', 'S', 'E', ARRAY['S','E','A'], 'Bachelor', 3, 'Offentlig', '450 000 – 620 000 kr/år', 'Stabil'),
('barnehagepedagog', 'Barnehagelærer', 'Kindergarten Teacher', 'Planlegger og gjennomfører pedagogiske aktiviteter for barn 0–6 år.', 'Plans and implements educational activities for children aged 0–6.', 'S', 'A', ARRAY['S','A'], 'Bachelor', 3, 'Offentlig/Privat', '450 000 – 600 000 kr/år', 'Stabil'),

-- Enterprising (E)
('advokat', 'Advokat', 'Lawyer', 'Gir juridisk rådgivning og representerer klienter i rettsaker.', 'Provides legal advice and represents clients in legal proceedings.', 'E', 'I', ARRAY['E','I','S'], 'Master', 5, 'Privat', '700 000 – 2 000 000 kr/år', 'Stabil'),
('reklamekonsulent', 'Reklamekonsulent/Markedsfører', 'Marketing Consultant', 'Planlegger og gjennomfører markedsføringskampanjer for bedrifter.', 'Plans and executes marketing campaigns for businesses.', 'E', 'A', ARRAY['E','A','S'], 'Bachelor', 3, 'Privat', '500 000 – 900 000 kr/år', 'Stabil'),
('raaadgiver', 'Managementkonsulent', 'Management Consultant', 'Rådgir bedrifter om strategi, effektivisering og organisasjonsutvikling.', 'Advises businesses on strategy, efficiency and organizational development.', 'E', 'I', ARRAY['E','I','C'], 'Master', 5, 'Privat', '750 000 – 1 500 000 kr/år', 'Stabil'),
('gründer', 'Gründer/Entreprenør', 'Entrepreneur', 'Starter og driver egne bedrifter med nye produkter eller tjenester.', 'Starts and runs own businesses with new products or services.', 'E', 'A', ARRAY['E','A','I'], 'Variert', 0, 'Privat', 'Varierer', 'Høy vekst'),
('politimann', 'Politibetjent', 'Police Officer', 'Håndhever loven, forebygger kriminalitet og trygger samfunnet.', 'Enforces the law, prevents crime and ensures public safety.', 'E', 'S', ARRAY['E','S','R'], 'Bachelor', 3, 'Offentlig', '500 000 – 750 000 kr/år', 'Stabil'),

-- Conventional (C)
('revisor', 'Revisor', 'Auditor/Accountant', 'Kontrollerer og reviderer regnskap og finansielle rapporter.', 'Controls and audits accounts and financial reports.', 'C', 'I', ARRAY['C','I','E'], 'Bachelor', 3, 'Privat', '550 000 – 900 000 kr/år', 'Stabil'),
('logistiker', 'Logistiker', 'Logistics Coordinator', 'Planlegger og koordinerer transport og vareflyten i forsyningskjeder.', 'Plans and coordinates transport and goods flow in supply chains.', 'C', 'E', ARRAY['C','E','R'], 'Bachelor', 3, 'Privat', '480 000 – 720 000 kr/år', 'Stabil'),
('biblioteka', 'Bibliotekar', 'Librarian', 'Organiserer, bevarer og formidler informasjon og litteratur.', 'Organizes, preserves and mediates information and literature.', 'C', 'S', ARRAY['C','S','I'], 'Bachelor', 3, 'Offentlig', '440 000 – 600 000 kr/år', 'Synkende'),
('regnskapsfoerer', 'Regnskapsfører', 'Bookkeeper', 'Fører og kontrollerer regnskaper for privatpersoner og bedrifter.', 'Keeps and controls accounts for individuals and businesses.', 'C', 'E', ARRAY['C','E'], 'Bachelor', 3, 'Privat', '480 000 – 700 000 kr/år', 'Stabil'),
('apoteker', 'Farmasøyt/Apoteker', 'Pharmacist', 'Tilbereder og utleverer legemidler og gir råd om medisinbruk.', 'Prepares and dispenses medications and advises on their use.', 'C', 'I', ARRAY['C','I','S'], 'Master', 5, 'Privat/Offentlig', '550 000 – 800 000 kr/år', 'Stabil');

-- ============================================================
-- EDUCATION PROGRAMS (norske utdanningsprogram)
-- ============================================================
insert into public.education_programs (slug, title_no, title_en, description_no, description_en, level, duration_years, riasec_match, institution_type, subject_list) values
-- Videregående utdanningsprogram (Vg1)
('studiespesialisering', 'Studiespesialisering', 'General Studies', 'Gir generell studiekompetanse og forberedelse til høyere utdanning.', 'Provides general university admission and preparation for higher education.', 'Videregående (Vg1-Vg3)', 3, ARRAY['I','A','S','E','C'], 'Videregående skole', ARRAY['Matematikk','Norsk','Engelsk','Naturfag','Historie','Samfunnsfag','Programfag']),
('teknikk-industriell-produksjon', 'Teknikk og industriell produksjon (TIP)', 'Technology and Industrial Production', 'Utdanner fagarbeidere til industri, produksjon og teknikk.', 'Trains skilled workers for industry, production and technology.', 'Videregående (Vg1-Vg3)', 4, ARRAY['R','I','C'], 'Videregående skole', ARRAY['Mekanikk','Elektro','CNC','Sveising','Hydraulikk','Produksjonsteknikk']),
('elektrofag', 'Elektrofag', 'Electrical Studies', 'Utdanner fagarbeidere innen elektro, automatisering og data-/elektronikk.', 'Trains skilled workers in electrical engineering, automation and electronics.', 'Videregående (Vg1-Vg3)', 4, ARRAY['R','I','C'], 'Videregående skole', ARRAY['Elektroteknikk','Automatisering','Datakommunikasjon','Elektronikk']),
('bygg-anleggsteknikk', 'Bygg- og anleggsteknikk', 'Construction and Civil Engineering', 'Utdanner fagarbeidere i tømrer-, rørlegger- og anleggsfag.', 'Trains skilled workers in carpentry, plumbing and construction trades.', 'Videregående (Vg1-Vg3)', 4, ARRAY['R','C','E'], 'Videregående skole', ARRAY['Tømrerarbeid','Rørleggerfag','Muring','Maling','Anleggsarbeid']),
('helse-oppvekstfag', 'Helse- og oppvekstfag (HOF)', 'Health and Social Studies', 'Utdanner til arbeid i helse-, sosial- og barnehagerelaterte yrker.', 'Prepares students for careers in health, social and childcare services.', 'Videregående (Vg1-Vg3)', 3, ARRAY['S','I','C'], 'Videregående skole', ARRAY['Helsearbeiderfaget','Barne- og ungdomsarbeiderfaget','Psykologi','Biologi','Anatomi']),
('restaurant-matfag', 'Restaurant og matfag', 'Restaurant and Food Studies', 'Utdanner kokker, servitører og andre innen mat og restaurant.', 'Trains chefs, waiters and others in food and restaurant industries.', 'Videregående (Vg1-Vg3)', 4, ARRAY['R','A','S'], 'Videregående skole', ARRAY['Kokk','Servitør','Matproduksjon','Matkultur']),
('naturbruk', 'Naturbruk', 'Agriculture and Forestry', 'Utdanner til landbruk, skogbruk, fiske og naturforvaltning.', 'Trains students for agriculture, forestry, fishing and nature management.', 'Videregående (Vg1-Vg3)', 4, ARRAY['R','I','S'], 'Videregående skole', ARRAY['Landbruk','Skogbruk','Fiske','Havbruk','Naturforvaltning','Hest']),
('medier-kommunikasjon', 'Medier og kommunikasjon', 'Media and Communication', 'Utdanner til mediearbeid, journalistikk, foto og design.', 'Prepares students for media work, journalism, photography and design.', 'Videregående (Vg1-Vg3)', 3, ARRAY['A','E','S'], 'Videregående skole', ARRAY['Journalistikk','Foto','Film','Design','Digital markedsføring']),

-- Høyere utdanning
('ingeniorfag-data', 'Bachelor i ingeniørfag – data', 'Bachelor in Computer Engineering', 'Treårig ingeniørutdanning som gir tittelen ingeniør. Kombinerer programmering, nettverk, databaser og systemutvikling med praktisk ingeniørmetodikk. Tilbys ved NTNU, OsloMet, USN, UiT og de fleste statlige høgskoler.', 'Three-year engineering programme that grants the title of engineer. Combines programming, networking, databases and systems development with practical engineering methodology. Offered at NTNU, OsloMet, USN, UiT and most state university colleges.', 'Bachelor (3 år)', 3, ARRAY['I','C','R'], 'Høgskole/Universitet', ARRAY['Programmering','Databaser','Algoritmer','Nettverk','Systemutvikling','Prosjektledelse','Matematikk']),
('informatikk-bachelor', 'Bachelorstudiet i informatikk', 'Bachelor in Computer Science', 'Mer teoritungt studium innen datateknologi og programvitenskap. Gir ikke ingeniørtittelen, men er godt grunnlag for masterstudier og forskning.', 'More theory-focused study in computer science. Does not grant the engineer title, but provides a strong foundation for master studies and research.', 'Bachelor (3 år)', 3, ARRAY['I','C','R'], 'Universitet', ARRAY['Programmering','Algoritmer','Matematikk','Kunstig intelligens','Maskinlæring','Databaser']),
('ingeniørstudiet-bygg', 'Bachelorstudiet i bygg- og miljøteknikk', 'Bachelor in Civil Engineering', 'Utdanner ingeniører til konstruksjon, infrastruktur og miljø.', 'Trains engineers for construction, infrastructure and environment.', 'Bachelor (3 år)', 3, ARRAY['R','I','C'], 'Høgskole', ARRAY['Konstruksjonsteknikk','Geoteknikk','Materialteknologi','Prosjektledelse']),
('sykepleierutdanning', 'Bachelorstudiet i sykepleie', 'Bachelor in Nursing', 'Gir kompetanse til å utøve sykepleie i alle deler av helsevesenet.', 'Provides competence to practice nursing in all parts of the health system.', 'Bachelor (3 år)', 3, ARRAY['S','I','C'], 'Høgskole', ARRAY['Anatomi','Fysiologi','Farmakologi','Klinisk praksis','Psykiatri']),
('laererutdanning-grunnskole', 'Grunnskolelærerutdanning', 'Primary School Teacher Education', 'Utdanner lærere for 1.–10. trinn med bred faglig og pedagogisk kompetanse.', 'Trains teachers for grades 1–10 with broad academic and pedagogical competence.', 'Master (5 år)', 5, ARRAY['S','A','E'], 'Høgskole/Universitet', ARRAY['Pedagogikk','Norsk','Matematikk','Naturfag','Samfunnsfag','Praksis']),
('oekonomi-administrasjon', 'Bachelor i økonomi og administrasjon (BI/NHH)', 'Bachelor in Business Administration', 'Gir bred kunnskap i økonomi, finans, markedsføring og ledelse.', 'Provides broad knowledge in economics, finance, marketing and management.', 'Bachelor (3 år)', 3, ARRAY['E','C','I'], 'Høgskole/Universitet', ARRAY['Regnskap','Finans','Markedsføring','Strategiledelse','Rettslære','Statistikk']),
('juss', 'Masterstudiet i rettsvitenskap (juss)', 'Master of Laws (LL.M)', 'Gir grundig juridisk kompetanse og forberedelse til advokatyrket.', 'Provides thorough legal competence and preparation for the legal profession.', 'Master (5 år)', 5, ARRAY['E','I','C'], 'Universitet', ARRAY['Privatrett','Strafferett','Forvaltningsrett','Kontraktsrett','Prosessrett']),
('medisin', 'Profesjonsstudiet i medisin', 'Medical Degree (M.D.)', 'Utdanner leger med kunnskap om diagnostikk, behandling og forebygging.', 'Trains doctors with knowledge of diagnostics, treatment and prevention.', 'Profesjonsstudium (6 år)', 6, ARRAY['I','S','C'], 'Universitet', ARRAY['Anatomi','Fysiologi','Patologi','Farmakologi','Klinisk medisin','Praksis']),
('psykologi', 'Profesjonsstudiet i psykologi', 'Professional Study in Psychology', 'Utdanner psykologer for klinisk arbeid, forskning og organisasjoner.', 'Trains psychologists for clinical work, research and organizations.', 'Profesjonsstudium (6 år)', 6, ARRAY['S','I','A'], 'Universitet', ARRAY['Kognitiv psykologi','Klinisk psykologi','Nevropsykologi','Statistikk','Praksis']),
('arkitektur', 'Masterstudiet i arkitektur', 'Master of Architecture', 'Utdanner arkitekter i design, konstruksjon og byplanlegging.', 'Trains architects in design, construction and urban planning.', 'Master (5 år)', 5, ARRAY['A','I','R'], 'Høgskole/Universitet', ARRAY['Arkitekturteori','Konstruksjon','Bærekraft','Byplanlegging','Prosjektering']);

-- ============================================================
-- ASSESSMENT QUESTIONS — RIASEC (60 spørsmål, 10 per type)
-- ============================================================
insert into public.assessment_questions (assessment_type, question_no, text_no, text_en, category, weight) values
-- Realistic (R)
('riasec', 1, 'Jeg liker å reparere ting som er ødelagt.', 'I enjoy repairing things that are broken.', 'R', 1.0),
('riasec', 2, 'Jeg foretrekker å jobbe utendørs framfor på kontor.', 'I prefer working outdoors rather than in an office.', 'R', 1.0),
('riasec', 3, 'Jeg er flink til å bruke verktøy og maskiner.', 'I am good at using tools and machines.', 'R', 1.0),
('riasec', 4, 'Jeg liker å bygge ting med hendene mine.', 'I enjoy building things with my hands.', 'R', 1.0),
('riasec', 5, 'Tekniske og mekaniske oppgaver motiverer meg.', 'Technical and mechanical tasks motivate me.', 'R', 1.0),
('riasec', 6, 'Jeg liker sport og fysisk aktivitet som del av jobb.', 'I enjoy sports and physical activity as part of work.', 'R', 1.0),
('riasec', 7, 'Jeg er interessert i hvordan maskiner og motorer fungerer.', 'I am interested in how machines and engines work.', 'R', 1.0),
('riasec', 8, 'Jeg foretrekker konkrete, praktiske resultater fremfor abstrakte ideer.', 'I prefer concrete, practical results over abstract ideas.', 'R', 1.0),
('riasec', 9, 'Jeg trives godt med håndverk og praktisk arbeid.', 'I thrive with crafts and practical work.', 'R', 1.0),
('riasec', 10, 'Å jobbe med planter, dyr eller natur tiltrekker meg.', 'Working with plants, animals or nature appeals to me.', 'R', 1.0),
-- Investigative (I)
('riasec', 11, 'Jeg liker å løse kompliserte problemer.', 'I enjoy solving complex problems.', 'I', 1.0),
('riasec', 12, 'Vitenskapelige emner fascinerer meg.', 'Scientific subjects fascinate me.', 'I', 1.0),
('riasec', 13, 'Jeg liker å forske og finne ny kunnskap.', 'I enjoy researching and discovering new knowledge.', 'I', 1.0),
('riasec', 14, 'Jeg analyserer gjerne data og tall.', 'I enjoy analyzing data and numbers.', 'I', 1.0),
('riasec', 15, 'Jeg stiller ofte spørsmål om hvordan ting fungerer.', 'I often ask questions about how things work.', 'I', 1.0),
('riasec', 16, 'Matematikk og logikk er sterke sidene mine.', 'Mathematics and logic are my strengths.', 'I', 1.0),
('riasec', 17, 'Jeg liker å lese vitenskapelige artikler og bøker.', 'I enjoy reading scientific articles and books.', 'I', 1.0),
('riasec', 18, 'Å finne årsaker og sammenhenger motiverer meg.', 'Finding causes and connections motivates me.', 'I', 1.0),
('riasec', 19, 'Jeg jobber gjerne selvstendig med intellektuelle oppgaver.', 'I enjoy working independently on intellectual tasks.', 'I', 1.0),
('riasec', 20, 'Jeg er nysgjerrig og vil forstå verden dypere.', 'I am curious and want to understand the world more deeply.', 'I', 1.0),
-- Artistic (A)
('riasec', 21, 'Jeg uttrykker meg gjerne gjennom kunst, musikk eller skriving.', 'I like to express myself through art, music or writing.', 'A', 1.0),
('riasec', 22, 'Kreativitet er viktig for meg i jobben.', 'Creativity is important to me at work.', 'A', 1.0),
('riasec', 23, 'Jeg liker design og estetikk.', 'I enjoy design and aesthetics.', 'A', 1.0),
('riasec', 24, 'Fantasi og innbilningskraft preger måten jeg tenker på.', 'Imagination and creativity characterize the way I think.', 'A', 1.0),
('riasec', 25, 'Jeg er opptatt av skjønnhet, harmoni og form.', 'I care about beauty, harmony and form.', 'A', 1.0),
('riasec', 26, 'Å fortelle historier eller skape innhold gleder meg.', 'Telling stories or creating content brings me joy.', 'A', 1.0),
('riasec', 27, 'Jeg liker å improvisere og finne uvanlige løsninger.', 'I enjoy improvising and finding unusual solutions.', 'A', 1.0),
('riasec', 28, 'Kulturelle opplevelser som teater og kunst engasjerer meg.', 'Cultural experiences like theatre and art engage me.', 'A', 1.0),
('riasec', 29, 'Jeg setter pris på originalitet og individualitet.', 'I value originality and individuality.', 'A', 1.0),
('riasec', 30, 'Å skape noe nytt er en stor kilde til glede for meg.', 'Creating something new is a great source of joy for me.', 'A', 1.0),
-- Social (S)
('riasec', 31, 'Jeg trives med å hjelpe andre mennesker.', 'I enjoy helping other people.', 'S', 1.0),
('riasec', 32, 'Å undervise eller veilede andre gir meg energi.', 'Teaching or guiding others gives me energy.', 'S', 1.0),
('riasec', 33, 'Jeg er god til å lytte og vise empati.', 'I am good at listening and showing empathy.', 'S', 1.0),
('riasec', 34, 'Menneskelige relasjoner er kjernen i arbeidet mitt.', 'Human relationships are at the core of my work.', 'S', 1.0),
('riasec', 35, 'Jeg er interessert i psykologi og menneskelig atferd.', 'I am interested in psychology and human behaviour.', 'S', 1.0),
('riasec', 36, 'Å bidra til samfunnet og fellesskapet motiverer meg.', 'Contributing to society and community motivates me.', 'S', 1.0),
('riasec', 37, 'Jeg liker å jobbe i team og samarbeide med andre.', 'I enjoy working in teams and collaborating with others.', 'S', 1.0),
('riasec', 38, 'Omsorg for sårbare grupper betyr mye for meg.', 'Caring for vulnerable groups means a lot to me.', 'S', 1.0),
('riasec', 39, 'Jeg er opptatt av rettferdighet og likeverd.', 'I care about justice and equality.', 'S', 1.0),
('riasec', 40, 'Jeg motiveres av å se andre mestre og vokse.', 'I am motivated by seeing others succeed and grow.', 'S', 1.0),
-- Enterprising (E)
('riasec', 41, 'Jeg liker å lede og motivere andre.', 'I enjoy leading and motivating others.', 'E', 1.0),
('riasec', 42, 'Å selge ideer eller produkter faller meg naturlig.', 'Selling ideas or products comes naturally to me.', 'E', 1.0),
('riasec', 43, 'Jeg er ambisiøs og ønsker å nå høye mål.', 'I am ambitious and want to achieve high goals.', 'E', 1.0),
('riasec', 44, 'Forhandlinger og diskusjoner stimulerer meg.', 'Negotiations and discussions stimulate me.', 'E', 1.0),
('riasec', 45, 'Jeg er god til å overbevise og påvirke andre.', 'I am good at convincing and influencing others.', 'E', 1.0),
('riasec', 46, 'Jeg tar gjerne risiko for å oppnå noe stort.', 'I willingly take risks to achieve something great.', 'E', 1.0),
('riasec', 47, 'Forretningsutvikling og strategi interesserer meg.', 'Business development and strategy interest me.', 'E', 1.0),
('riasec', 48, 'Å starte prosjekter og initiere endring tiltrekker meg.', 'Starting projects and initiating change appeals to me.', 'E', 1.0),
('riasec', 49, 'Makt og innflytelse er viktig for meg.', 'Power and influence are important to me.', 'E', 1.0),
('riasec', 50, 'Suksess og konkurranse driver meg fremover.', 'Success and competition drive me forward.', 'E', 1.0),
-- Conventional (C)
('riasec', 51, 'Jeg liker orden, systemer og klare prosedyrer.', 'I enjoy order, systems and clear procedures.', 'C', 1.0),
('riasec', 52, 'Nøyaktighet og grundighet er viktig for meg.', 'Accuracy and thoroughness are important to me.', 'C', 1.0),
('riasec', 53, 'Jeg trives godt med strukturerte og forutsigbare oppgaver.', 'I thrive with structured and predictable tasks.', 'C', 1.0),
('riasec', 54, 'Regnskap, data og administrasjon er interessante for meg.', 'Accounting, data and administration interest me.', 'C', 1.0),
('riasec', 55, 'Jeg er opptatt av regler og følger dem gjerne.', 'I care about rules and tend to follow them.', 'C', 1.0),
('riasec', 56, 'Dokumentasjon og journalføring er oppgaver jeg mestrer.', 'Documentation and record-keeping are tasks I handle well.', 'C', 1.0),
('riasec', 57, 'Jeg foretrekker klare instruksjoner framfor åpne oppgaver.', 'I prefer clear instructions over open-ended tasks.', 'C', 1.0),
('riasec', 58, 'Å organisere og planlegge gir meg tilfredsstillelse.', 'Organising and planning gives me satisfaction.', 'C', 1.0),
('riasec', 59, 'Pålitelighet og konsistens kjennetegner arbeidet mitt.', 'Reliability and consistency characterize my work.', 'C', 1.0),
('riasec', 60, 'Jeg liker å jobbe med tall, statistikk og budsjetter.', 'I enjoy working with numbers, statistics and budgets.', 'C', 1.0);

-- ============================================================
-- BIG FIVE (50 spørsmål, 10 per dimensjon)
-- ============================================================
insert into public.assessment_questions (assessment_type, question_no, text_no, text_en, category, weight) values
-- Openness (O)
('big_five', 1, 'Jeg er nysgjerrig på mange ulike ting.', 'I am curious about many different things.', 'O', 1.0),
('big_five', 2, 'Jeg liker å tenke på abstrakte ideer.', 'I enjoy thinking about abstract ideas.', 'O', 1.0),
('big_five', 3, 'Jeg har rik fantasi.', 'I have a rich imagination.', 'O', 1.0),
('big_five', 4, 'Jeg setter pris på kunst, musikk og litteratur.', 'I appreciate art, music and literature.', 'O', 1.0),
('big_five', 5, 'Jeg liker å prøve nye og ukjente ting.', 'I enjoy trying new and unfamiliar things.', 'O', 1.0),
('big_five', 6, 'Jeg foretrekker variasjon framfor rutine.', 'I prefer variety over routine.', 'O', 1.0),
('big_five', 7, 'Nye ideer og kreative løsninger fascinerer meg.', 'New ideas and creative solutions fascinate me.', 'O', 1.0),
('big_five', 8, 'Jeg er interessert i kultur og filosofi.', 'I am interested in culture and philosophy.', 'O', 1.0),
('big_five', 9, 'Jeg ser verden fra mange ulike vinkler.', 'I see the world from many different angles.', 'O', 1.0),
('big_five', 10, 'Å lære nye ting er noe av det beste jeg vet.', 'Learning new things is one of my favourite activities.', 'O', 1.0),
-- Conscientiousness (C)
('big_five', 11, 'Jeg fullfører alltid oppgavene jeg starter.', 'I always complete the tasks I start.', 'C', 1.0),
('big_five', 12, 'Jeg er svært organisert i hverdagen.', 'I am very organized in everyday life.', 'C', 1.0),
('big_five', 13, 'Jeg planlegger ting nøye i forkant.', 'I plan things carefully in advance.', 'C', 1.0),
('big_five', 14, 'Jeg er pålitelig og holder tidsfrister.', 'I am reliable and meet deadlines.', 'C', 1.0),
('big_five', 15, 'Jeg jobber hardt for å nå målene mine.', 'I work hard to achieve my goals.', 'C', 1.0),
('big_five', 16, 'Jeg er disiplinert og selvkontrollert.', 'I am disciplined and self-controlled.', 'C', 1.0),
('big_five', 17, 'Jeg er nøye og detaljorientert.', 'I am careful and detail-oriented.', 'C', 1.0),
('big_five', 18, 'Jeg setter meg klare mål og følger dem opp.', 'I set clear goals and follow up on them.', 'C', 1.0),
('big_five', 19, 'Orden og struktur gir meg trygghet.', 'Order and structure give me security.', 'C', 1.0),
('big_five', 20, 'Jeg unngår å utsette ting jeg bør gjøre.', 'I avoid postponing things I should do.', 'C', 1.0),
-- Extraversion (E)
('big_five', 21, 'Jeg er utadvendt og sosial av natur.', 'I am outgoing and social by nature.', 'E', 1.0),
('big_five', 22, 'Jeg liker å være i sentrum av oppmerksomheten.', 'I enjoy being the centre of attention.', 'E', 1.0),
('big_five', 23, 'Jeg får energi av å møte nye mennesker.', 'I get energy from meeting new people.', 'E', 1.0),
('big_five', 24, 'Jeg er pratsom og uttrykker meg lett.', 'I am talkative and express myself easily.', 'E', 1.0),
('big_five', 25, 'Jeg liker store selskaper og sosiale sammenkomster.', 'I enjoy large gatherings and social events.', 'E', 1.0),
('big_five', 26, 'Jeg tar gjerne initiativ i grupper.', 'I readily take initiative in groups.', 'E', 1.0),
('big_five', 27, 'Jeg er optimistisk og entusiastisk.', 'I am optimistic and enthusiastic.', 'E', 1.0),
('big_five', 28, 'Jeg trives best blant folk, ikke alene.', 'I thrive best among people, not alone.', 'E', 1.0),
('big_five', 29, 'Jeg er aktiv og full av energi.', 'I am active and full of energy.', 'E', 1.0),
('big_five', 30, 'Jeg synes det er lett å starte samtaler med fremmede.', 'I find it easy to start conversations with strangers.', 'E', 1.0),
-- Agreeableness (A)
('big_five', 31, 'Jeg bryr meg mye om andres ve og vel.', 'I care a great deal about others'' wellbeing.', 'A', 1.0),
('big_five', 32, 'Jeg er omsorgsfull og varm overfor andre.', 'I am caring and warm towards others.', 'A', 1.0),
('big_five', 33, 'Jeg unngår konflikter og søker samarbeid.', 'I avoid conflicts and seek cooperation.', 'A', 1.0),
('big_five', 34, 'Jeg stoler på at folk flest er gode.', 'I trust that most people are good.', 'A', 1.0),
('big_five', 35, 'Å hjelpe andre gir meg mye glede.', 'Helping others gives me great joy.', 'A', 1.0),
('big_five', 36, 'Jeg er tolerant og aksepterende overfor ulike mennesker.', 'I am tolerant and accepting of different people.', 'A', 1.0),
('big_five', 37, 'Jeg setter andres behov foran mine egne.', 'I put others'' needs before my own.', 'A', 1.0),
('big_five', 38, 'Jeg er høflig og hensynsfull i omgang med andre.', 'I am polite and considerate in my dealings with others.', 'A', 1.0),
('big_five', 39, 'Jeg søker harmoni og unngår å krenke andre.', 'I seek harmony and avoid offending others.', 'A', 1.0),
('big_five', 40, 'Jeg er medfølende og forstående.', 'I am compassionate and understanding.', 'A', 1.0),
-- Neuroticism (N)
('big_five', 41, 'Jeg bekymrer meg ofte for ting.', 'I often worry about things.', 'N', 1.0),
('big_five', 42, 'Jeg er lett stresset i krevende situasjoner.', 'I am easily stressed in demanding situations.', 'N', 1.0),
('big_five', 43, 'Humøret mitt svinger en del.', 'My mood fluctuates quite a bit.', 'N', 1.0),
('big_five', 44, 'Jeg er lett irritert når ting ikke går som planlagt.', 'I get easily irritated when things don''t go as planned.', 'N', 1.0),
('big_five', 45, 'Jeg er usikker på meg selv i nye situasjoner.', 'I feel insecure in new situations.', 'N', 1.0),
('big_five', 46, 'Jeg grubbler mye over ting som har skjedd.', 'I ruminate a lot about things that have happened.', 'N', 1.0),
('big_five', 47, 'Jeg er følsom for kritikk fra andre.', 'I am sensitive to criticism from others.', 'N', 1.0),
('big_five', 48, 'Angst eller nervøsitet påvirker meg i hverdagen.', 'Anxiety or nervousness affects my daily life.', 'N', 1.0),
('big_five', 49, 'Jeg har vanskeligheter med å slappe av.', 'I have difficulty relaxing.', 'N', 1.0),
('big_five', 50, 'Negative tanker kan overvelde meg.', 'Negative thoughts can overwhelm me.', 'N', 1.0);

-- ============================================================
-- VALUES ASSESSMENT (20 spørsmål)
-- ============================================================
insert into public.assessment_questions (assessment_type, question_no, text_no, text_en, category, weight) values
('values', 1, 'Det er viktig for meg å ha frihet til å bestemme selv hvordan jeg jobber.', 'It is important for me to have freedom to decide how I work.', 'autonomy', 1.0),
('values', 2, 'Trygg fast jobb er viktigere for meg enn høy lønn.', 'A secure steady job is more important to me than high pay.', 'security', 1.0),
('values', 3, 'Jeg vil oppnå noe betydningsfullt i karrieren min.', 'I want to achieve something meaningful in my career.', 'achievement', 1.0),
('values', 4, 'Gode kolleger og et sosialt arbeidsmiljø betyr mye for meg.', 'Good colleagues and a social work environment mean a lot to me.', 'relationships', 1.0),
('values', 5, 'Jobben bør gi rom for kreativitet og egne ideer.', 'The job should allow room for creativity and own ideas.', 'creativity', 1.0),
('values', 6, 'Det er viktig at jobben min hjelper andre.', 'It is important that my job helps others.', 'helping', 1.0),
('values', 7, 'Høy status og respekt fra andre er viktig for meg.', 'High status and respect from others is important to me.', 'prestige', 1.0),
('values', 8, 'Jeg vil gjerne ha en jobb med varierte oppgaver.', 'I would like a job with varied tasks.', 'variety', 1.0),
('values', 9, 'Å jobbe selvstendig og fatte egne beslutninger er avgjørende.', 'Working independently and making my own decisions is essential.', 'autonomy', 1.0),
('values', 10, 'God pensjonsordning og trygge arbeidsforhold er viktig.', 'Good pension and safe working conditions are important.', 'security', 1.0),
('values', 11, 'Jeg ønsker å bli en ekspert og utvikle meg faglig.', 'I want to become an expert and develop professionally.', 'achievement', 1.0),
('values', 12, 'Samarbeid og fellesskap på arbeidsplassen motiverer meg.', 'Collaboration and community at work motivates me.', 'relationships', 1.0),
('values', 13, 'Å skape noe nytt og originalt driver meg.', 'Creating something new and original drives me.', 'creativity', 1.0),
('values', 14, 'Jeg vil jobbe med noe som gjør verden til et bedre sted.', 'I want to work with something that makes the world a better place.', 'helping', 1.0),
('values', 15, 'Karriereutvikling og forfremmelse er viktig for meg.', 'Career advancement and promotion are important to me.', 'prestige', 1.0),
('values', 16, 'Jeg foretrekker en jobb der ingen dag er lik.', 'I prefer a job where no two days are the same.', 'variety', 1.0),
('values', 17, 'Fleksibel arbeidstid og hjemmekontor er viktig for meg.', 'Flexible working hours and remote work are important to me.', 'autonomy', 1.0),
('values', 18, 'Jeg vil unngå risiko og usikkerhet i jobben.', 'I want to avoid risk and uncertainty in my job.', 'security', 1.0),
('values', 19, 'Å løse utfordrende problemer gir meg tilfredsstillelse.', 'Solving challenging problems gives me satisfaction.', 'achievement', 1.0),
('values', 20, 'En jobb som bidrar positivt til samfunnet betyr mye.', 'A job that contributes positively to society means a lot.', 'helping', 1.0);
