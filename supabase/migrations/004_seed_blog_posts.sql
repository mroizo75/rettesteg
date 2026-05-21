-- Seed blog posts for rettesteg.no
insert into public.blog_posts (slug, title_no, title_en, excerpt_no, excerpt_en, content_no, content_en, published, author, tags)
values

(
  'hva-er-riasec',
  'Hva er RIASEC-testen, og hvorfor bør du ta den?',
  'What is the RIASEC Test, and Why Should You Take It?',
  'RIASEC er den mest brukte karieremodellen i verden, utviklet av psykolog John Holland. Vi forklarer hva modellen er, hvordan den fungerer, og hvordan resultatet kan hjelpe deg å velge riktig utdanning og yrke.',
  'RIASEC is the world''s most widely used career model, developed by psychologist John Holland. We explain what the model is, how it works, and how the results can help you choose the right education and career.',
  '<h2>Hva er RIASEC?</h2>
<p>RIASEC er en teori om karrieremessige interesser utviklet av den amerikanske psykologen John L. Holland på 1950-tallet. Forkortelsen står for seks personlighetstyper: <strong>Realistisk, Investigativ, Artistisk, Sosial, Enterprising (Lederorientert) og Konvensjonell</strong>.</p>
<p>Teorien bygger på ideen om at mennesker kan klassifiseres i disse seks typene, og at yrker likedan kan beskrives ut fra hvilke typer som trives best i dem. Jo bedre samsvar det er mellom din RIASEC-type og yrkets krav, jo mer sannsynlig er det at du vil trives og lykkes.</p>
<h2>Hva betyr de seks typene?</h2>
<ul>
  <li><strong>R – Realistisk:</strong> Liker praktisk arbeid, maskiner, utstyr og friluftsliv. Eksempel: ingeniør, snekker, pilot.</li>
  <li><strong>I – Investigativ:</strong> Liker å forske, analysere og løse komplekse problemer. Eksempel: forsker, lege, dataingeniør.</li>
  <li><strong>A – Artistisk:</strong> Liker kreativt og originalt arbeid. Eksempel: designer, musiker, forfatter.</li>
  <li><strong>S – Sosial:</strong> Liker å hjelpe, lære og samarbeide med andre. Eksempel: lærer, sykepleier, psykolog.</li>
  <li><strong>E – Enterprising (Lederorientert):</strong> Liker å lede, overtale og selge. Eksempel: selger, leder, advokat.</li>
  <li><strong>C – Konvensjonell:</strong> Liker orden, struktur og nøyaktig arbeid. Eksempel: regnskapsfører, administrator, bibliotekar.</li>
</ul>
<h2>Hva sier forskningen?</h2>
<p>Holland-modellen er en av de mest validerte og brukte modellene i karriereveiledning. Hundrevis av studier har vist at samsvar mellom personlighetstype og yrke har sterk sammenheng med jobbtilfredsstillelse, prestasjoner og lav gjennomtrekk.</p>
<p>I Norge brukes RIASEC-modellen aktivt i karriereveiledning på universiteter, høgskoler og i NAVs veiledningsverktøy.</p>
<h2>Slik bruker du resultatet</h2>
<p>Etter at du har fullført RIASEC-testen på Rettesteg, får du en tre-bokstavers kode — for eksempel <strong>IAS</strong> eller <strong>RIE</strong>. Denne koden brukes til å matche deg mot hundrevis av norske yrker og vise deg hvilke utdanningsveier som passer best.</p>
<p>Husk at testen gir innsikt, ikke fasitsvar. Bruk resultatet som et utgangspunkt for refleksjon og samtale med rådgiver eller foresatte.</p>
<hr>
<p><em>Ta RIASEC-testen gratis på Rettesteg og se hvilke yrker som matcher din personlighetstype.</em></p>',

  '<h2>What is RIASEC?</h2>
<p>RIASEC is a theory of occupational interests developed by the American psychologist John L. Holland in the 1950s. The acronym stands for six personality types: <strong>Realistic, Investigative, Artistic, Social, Enterprising and Conventional</strong>.</p>
<p>The theory is built on the idea that people can be classified into these six types, and that occupations can similarly be described in terms of which types thrive in them. The better the match between your RIASEC type and a job''s demands, the more likely you are to feel satisfied and succeed.</p>
<h2>What do the six types mean?</h2>
<ul>
  <li><strong>R – Realistic:</strong> Likes practical work, machinery, equipment and the outdoors. Examples: engineer, carpenter, pilot.</li>
  <li><strong>I – Investigative:</strong> Likes researching, analysing and solving complex problems. Examples: scientist, doctor, software engineer.</li>
  <li><strong>A – Artistic:</strong> Likes creative and original work. Examples: designer, musician, writer.</li>
  <li><strong>S – Social:</strong> Likes helping, teaching and collaborating with others. Examples: teacher, nurse, psychologist.</li>
  <li><strong>E – Enterprising:</strong> Likes leading, persuading and selling. Examples: salesperson, manager, lawyer.</li>
  <li><strong>C – Conventional:</strong> Likes order, structure and precise work. Examples: accountant, administrator, librarian.</li>
</ul>
<h2>What does the research say?</h2>
<p>The Holland model is one of the most validated and widely used frameworks in career counselling. Hundreds of studies have shown that the match between personality type and occupation is strongly correlated with job satisfaction, performance and low staff turnover.</p>
<h2>How to use your results</h2>
<p>After completing the RIASEC assessment on Rettesteg, you receive a three-letter code — for example <strong>IAS</strong> or <strong>RIE</strong>. This code is used to match you against hundreds of Norwegian occupations and show you which educational pathways fit best.</p>
<p>Remember that the assessment provides insight, not a definitive answer. Use the result as a starting point for reflection and conversation with a counsellor or parents.</p>
<hr>
<p><em>Take the RIASEC assessment for free on Rettesteg and see which careers match your personality type.</em></p>',

  true,
  'rettesteg.no',
  ARRAY['karriere', 'RIASEC', 'personlighetstest', 'utdanning']
),

(
  'videregaende-valg',
  'Videregående skole: Slik velger du riktig studieprogram i 2025',
  'Upper Secondary School: How to Choose the Right Programme in 2025',
  'Enten du drømer om realfag, kreative fag eller yrkesfag — vi guider deg gjennom strukturen på videregående i Norge og hjelper deg å ta et informert valg.',
  'Whether you dream of sciences, creative subjects or vocational training — we guide you through the structure of upper secondary education in Norway and help you make an informed choice.',
  '<h2>Videregående skole i Norge</h2>
<p>Videregående skole (VGS) i Norge er delt i <strong>studieforberedende</strong> og <strong>yrkesfaglige</strong> utdanningsprogrammer. Valget du tar her er viktig, men det er ikke irreversibelt — det finnes alltid veier videre.</p>
<h2>Studieforberedende programmer</h2>
<p>Fullført studieforberedende gir deg <strong>generell studiekompetanse</strong>, som er inngangsbilletten til de fleste universiteter og høgskoler. Eksempler på programmer:</p>
<ul>
  <li><strong>Studiespesialisering:</strong> Gir mulighet til å velge realfag (matematikk, fysikk, kjemi) eller programfag innen samfunnsfag, språk og økonomi.</li>
  <li><strong>Idrettsfag:</strong> Kombinerer toppidrett med akademiske fag.</li>
  <li><strong>Musikk, dans og drama (MDD):</strong> For deg med kunstneriske ambisjoner.</li>
  <li><strong>Medier og kommunikasjon:</strong> Gir studiekompetanse med fokus på digitale medier.</li>
</ul>
<h2>Yrkesfaglige programmer</h2>
<p>Yrkesfaglige programmer leder til <strong>fagbrev</strong> etter to år på skole og to år som lærling. Du kan også ta <strong>påbygg til studiekompetanse</strong> etter VG2 eller etter fagbrevet, om du ønsker å studere videre.</p>
<p>Populære yrkesfag med gode jobbmuligheter:</p>
<ul>
  <li>Elektro og datateknologi (inkl. IKT-servicefag)</li>
  <li>Bygg og anleggsteknikk</li>
  <li>Helse og oppvekstfag</li>
  <li>Teknikk og industriell produksjon</li>
  <li>Restaurant- og matfag</li>
</ul>
<h2>Hva bør du velge?</h2>
<p>Det finnes ingen fasit, men her er noen spørsmål som kan hjelpe deg:</p>
<ul>
  <li>Hva synes du er gøy på skolen nå? (Praktisk arbeid vs. teori?)</li>
  <li>Har du et drømmeyrke? Sjekk hva slags utdanning det krever på rettesteg.no.</li>
  <li>Vil du ta høyere utdanning? Studieforberedende er som regel nødvendig.</li>
</ul>
<h2>Y-veien og forkurs</h2>
<p>Har du fagbrev, kan du søke direkte opptak til ingeniørutdanning via <strong>Y-veien</strong> (uten studiekompetanse). Det finnes også <strong>forkurs for ingeniørutdanning</strong> for deg som mangler realfag fra studiespesialisering.</p>
<hr>
<p><em>Ta RIASEC-testen på Rettesteg og se hvilke studieretninger som passer din personlighet og interesser best.</em></p>',

  '<h2>Upper secondary school in Norway</h2>
<p>Upper secondary education (VGS) in Norway is divided into <strong>general studies</strong> and <strong>vocational</strong> programmes. The choice you make here is important, but it is not irreversible — there are always pathways forward.</p>
<h2>General studies programmes</h2>
<p>Completing a general studies programme gives you <strong>general university admissions certification</strong>, which is the entry ticket to most universities and university colleges. Examples:</p>
<ul>
  <li><strong>General studies (Studiespesialisering):</strong> Allows you to choose science subjects (mathematics, physics, chemistry) or electives in social sciences, languages and economics.</li>
  <li><strong>Sports (Idrettsfag):</strong> Combines elite sports with academic subjects.</li>
  <li><strong>Music, dance and drama (MDD):</strong> For students with artistic ambitions.</li>
  <li><strong>Media and communication:</strong> University admissions certification with a focus on digital media.</li>
</ul>
<h2>Vocational programmes</h2>
<p>Vocational programmes lead to a <strong>trade certificate</strong> after two years at school and two years as an apprentice. You can also take a <strong>supplementary year for university admission</strong> after VG2 or after your trade certificate, if you wish to continue into higher education.</p>
<h2>What should you choose?</h2>
<p>There is no single right answer, but here are some questions to help you:</p>
<ul>
  <li>What do you enjoy at school right now? (Practical work vs. theory?)</li>
  <li>Do you have a dream career? Check what qualifications it requires on rettesteg.no.</li>
  <li>Do you want to pursue higher education? General studies is usually necessary.</li>
</ul>
<hr>
<p><em>Take the RIASEC assessment on Rettesteg and see which study programmes suit your personality and interests best.</em></p>',

  true,
  'rettesteg.no',
  ARRAY['utdanning', 'videregående', 'studievalg', 'yrkesfag']
),

(
  'big-five-og-karriere',
  'Big Five-modellen: Hva sier din personlighet om karrieren din?',
  'The Big Five Model: What Does Your Personality Say About Your Career?',
  'Big Five er den mest vitenskapelig støttede modellen for personlighet. Lær hvordan egenskaper som åpenhet, planmessighet og ekstroversjon påvirker jobbprestasjon og trivsel.',
  'The Big Five is the most scientifically supported personality model. Learn how traits such as openness, conscientiousness and extraversion influence job performance and wellbeing at work.',
  '<h2>Hva er Big Five?</h2>
<p>Big Five, også kalt OCEAN-modellen, er den mest anerkjente modellen for personlighet i akademisk psykologi. Modellen beskriver fem brede personlighetsdimensjoner:</p>
<ul>
  <li><strong>O – Åpenhet for erfaringer (Openness):</strong> Nysgjerrighet, kreativitet og interesse for nye ideer.</li>
  <li><strong>C – Planmessighet (Conscientiousness):</strong> Organisering, pålitelighet og selvdisiplin.</li>
  <li><strong>E – Ekstroversjon (Extraversion):</strong> Sosialitet, energi og positiv affekt.</li>
  <li><strong>A – Medmenneskelighet (Agreeableness):</strong> Tillit, samarbeidsevne og empati.</li>
  <li><strong>N – Nevrotisisme (Neuroticism):</strong> Emosjonell ustabilitet og tendens til angst og stress.</li>
</ul>
<h2>Big Five og jobbprestasjon</h2>
<p>Forskning viser at <strong>planmessighet (C)</strong> er den enkeltfaktoren som best forutsier jobbprestasjon på tvers av alle yrker. Høy planmessighet er forbundet med grundighet, pålitelighet og evne til å fullføre oppgaver.</p>
<p>Andre dimensjoner er mer yrkesavhengige:</p>
<ul>
  <li><strong>Ekstroversjon</strong> er viktig i salg, ledelse og undervisning.</li>
  <li><strong>Åpenhet</strong> er viktig i kreative yrker og forskning.</li>
  <li><strong>Medmenneskelighet</strong> er viktig i omsorgsyrker og teamarbeid.</li>
  <li><strong>Lav nevrotisisme</strong> er viktig i stressbelastede yrker som akuttmedisin og luftfart.</li>
</ul>
<h2>Bruker Rettesteg Big Five?</h2>
<p>Ja! Rettesteg Pro inkluderer en validert Big Five-test som gir deg et detaljert bilde av din personlighetsprofil og hvordan den passer til ulike yrkesmiljøer. Resultatene kombineres med din RIASEC-profil for enda mer presise anbefalinger.</p>
<hr>
<p><em>Oppgrader til Rettesteg Pro for å ta Big Five-testen og få din fulle personlighetsprofil.</em></p>',

  '<h2>What is the Big Five?</h2>
<p>The Big Five, also called the OCEAN model, is the most widely accepted personality framework in academic psychology. It describes five broad personality dimensions:</p>
<ul>
  <li><strong>O – Openness to experience:</strong> Curiosity, creativity and interest in new ideas.</li>
  <li><strong>C – Conscientiousness:</strong> Organisation, reliability and self-discipline.</li>
  <li><strong>E – Extraversion:</strong> Sociability, energy and positive affect.</li>
  <li><strong>A – Agreeableness:</strong> Trust, cooperativeness and empathy.</li>
  <li><strong>N – Neuroticism:</strong> Emotional instability and tendency towards anxiety and stress.</li>
</ul>
<h2>Big Five and job performance</h2>
<p>Research shows that <strong>conscientiousness (C)</strong> is the single factor that best predicts job performance across all occupations. High conscientiousness is associated with thoroughness, reliability and the ability to complete tasks.</p>
<p>Other dimensions are more occupation-specific:</p>
<ul>
  <li><strong>Extraversion</strong> matters in sales, management and teaching.</li>
  <li><strong>Openness</strong> matters in creative professions and research.</li>
  <li><strong>Agreeableness</strong> matters in caring professions and teamwork.</li>
  <li><strong>Low neuroticism</strong> matters in high-stress occupations such as emergency medicine and aviation.</li>
</ul>
<h2>Does Rettesteg use the Big Five?</h2>
<p>Yes! Rettesteg Pro includes a validated Big Five assessment that gives you a detailed picture of your personality profile and how it fits different work environments. Results are combined with your RIASEC profile for even more precise recommendations.</p>
<hr>
<p><em>Upgrade to Rettesteg Pro to take the Big Five assessment and receive your full personality profile.</em></p>',

  true,
  'rettesteg.no',
  ARRAY['personlighet', 'Big Five', 'OCEAN', 'karriere', 'psykologi']
);
