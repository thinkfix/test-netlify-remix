import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
    await prisma.admin.create({
        data: {
            username: "admin_te",
            // this is a hashed version of "twixrox"
            passwordHash:
                "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
        },
    });

    await Promise.all(
        getClients().map((client) => {
            return prisma.client.create({ data: client });
        })
    );

    await Promise.all(
        getFaqs().map((faq) => {
            return prisma.faq.create({ data: faq });
        })
    );
}

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });

function getClients() {
    return [
        {
            name: "Extraoptical",
            url: "https://extraoptical.no/",
            imageUrl: "banner-thumb.jpeg",
            content: `Extra Optical er en norsk brillebutikk på nett og vi sliper briller til deg som er nærsynt, langsynt, eller har skjeve hornhinner. Extra Optical - optiker online.`,
            template: "noimage",
            markdown: `
# Test title  
## Test title 
### Test title 
#### Test title 
##### Test title 
###### Test title 

Other text 

**Tiny Elephant** har hjulpet Element Studio med deres nye Magento 2 nettbutikk. Herunder integrasjon mot deres forretningssystem Visma Business som synkroniserer ordre, varer, lagerstatus og kunder med nettbutikken.   
Butikken har også Algolia søk for en optimalisert søkefunksjon og Klarna Checkout for en «smooth» betalingsopplevelse.    

*Lorem ipsum dolor sit amet* praesent incididunt posuere. Velit duis nec hac facilisis odio nunc tristique aliquam. Sagittis consectetur gravida hendrerit convallis elit lobortis a pulvinar nulla risus faucibus. Phasellus pharetra aliqua lacus posuere netus urna nibh velit ullamcorper erat aliquet. Tempor semper integer platea malesuada semper luctus eleifend vel arcu.   

> Volutpat aenean feugiat sed viverra velit congue eiusmod nisi curabitur laoreet. Imperdiet magna convallis rhoncus proin blandit senectus porttitor dapibus aliquet augue. Augue proin habitasse fames id eget sed etiam nibh risus nulla tempus donec neque ultrices. Platea consequat leo molestie consequat dictum laoreet turpis blandit mauris ullamcorper viverra est. Feugiat volutpat in leo posuere nisl fringilla condimentum non ultrices imperdiet justo nulla volutpat urna.   

![Tux, the Linux mascot](/images/tux.png)

##### Unordered List
* First
* Second 
* Third  
   * First
   * Second 
   * Third  
   * 4th item
* 4th item

\`\`Use \`code\` in your Markdown file.\`\`

My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").

<https://www.markdownguide.org>  
<fake@example.com>

##### Ordered List
1. First
2. Second 
3. Third  
`
        },
        {
            name: "PetWorld",
            url: "https://www.petworld.no/",
            imageUrl: "banner-thumb.jpeg",
            content: `Petworld.no er norges dyrebutikk på nett med størst utvalg av hundefôr, kattemat, hundebur og dyreutstyr til bunnpriser. Gratis frakt over 499 kr og lynrask levering. 100% fornøyd garanti og alltid 30 dagers åpent kjøp.`,
            template: "fullwidth",
        },
        {
            name: "ElementStudio",
            url: "https://element-studio.no/",
            imageUrl: "banner-thumb.jpeg",
            pageImageUrl: "images/element.jpg",
            content: `Stort utvalg av kvalitetsmøbler og interiør fra Skandinaviske designere. Rask levering og personlig service. Nettbutikk og 700m2 butikk på Lilleaker ved CC Vest, Oslo. `,
            template: "fullwidth",
        },
        {
            name: "Rottefella",
            url: "https://rottefella.com/",
            imageUrl: "banner-thumb.jpeg",
            content: `Rottefella er en norsk utendørs pioner og verdens største utvikler og produsent av langrenns-, telemark- og fjellski-bindinger. Med nesten 100 års erfaring og kunnskap utvikler vi produkter som skaper flotte utendørsopplevelser og gode prestasjoner. Vår visjon er å inspirere alle til en aktiv livsstil utendørs og sørge for topp prestasjoner til de beste.`,
            template: "noimage",
        },
        {
            name: "Coverbrands",
            url: "https://www.coverbrands.no/",
            imageUrl: "banner-thumb.jpeg",
            content: `Coverbrands - skjønnhet på nett. Kjøp av Norges største nettbutikker innen sminke, hudpleie, hårpleie, kroppspleie, accessories, helse, supermat og parfyme.`,
            template: "fullwidth",
        },
        {
            name: "Zenostore",
            url: "https://zenostore.no/",
            imageUrl: "banner-thumb.jpeg",
            content: `Lorang by Zeno er strykefrie skjorter i premium kvalitet. Opplev klassisk skandinavisk design - mesterlig sydd i myk og luftig bomull. Hos oss får du oppleve lynrask levering, personlig bytteservice & fri retur. Betal sikkert med Klarna, bankkort eller Vipps.`,
            template: "twocolumns",
        },
    ];
}

function getFaqs() {
    return [
        {
            heading: "Hvordan blir jeg kunde hos Tiny Elephant?",
            content: `
Du tar kontakt med oss på [hei@tinyelephant.no](mailto:hei@tinyelephant.no) eller ringer oss på [22 34 32 34](tel:+4722343234) så vil vi hjelpe deg!
`
        },
        {
            heading: "Hvor mye koster en Magento nettbutikk?",
            content: `
En nettbutikk basert på Magento 2 koster fra kr 2990 per måned hos oss. Skreddersøm faktureres per time.
`
        },
        {
            heading: "Har dere integrasjon mellom Front Systems og Magento?",
            content: `
Ja! Den synkroniserer ordre, kunder, varedata, priser og kampanjer, lagerstatus med mer. Den støtter også synliggjøring av lagerstatus i ulike butikker i nettbutikken, samt bonuspoeng.
`
        },
        {
            heading: "Har dere integrasjon mellom Microsoft Dynamics og Magento?",
            content: `
Ja, det har vi laget.
`
        },
        {
            heading: "Har dere integrasjon mellom Visma Global og Magento?",
            content: `
Har dere integrasjon mellom Visma Global og Magento?
`
        },
        {
            heading: "Har dere integrasjon mellom Visma Business og Magento?",
            content: `
Ja, det har vi!

Den synkroniserer ordre, kunder, varedata, priser og kampanjer, lagerstatus med mer.
`
        },
        {
            heading: "Har dere integrasjon mellom Mamut og Magento?",
            content: `
Vi har flere kunder som benytter Mamut, og de bruker en integrasjon laget av RedAnt.
`
        },
        {
            heading: "Har dere integrasjon mellom Fiken og Magento?",
            content: `
Ikke enda, men det kommer! Ta kontakt, kanskje den er ferdig!
`
        },
        {
            heading: "Har dere integrasjon mellom Tripletex og Magento?",
            content: `
Ja! Denne overfører automatisk ordre og kunder fra Magento nettbutikken til Tripletex, slik at bokføringen blir en lek!
`
        },
        {
            heading: "Hvilke fraktleverandører kan jeg velge mellom til min Magento nettbutikk?",
            content: `
Vi har ferdige løsninger for å benytte Bring, Postnord, Dhl, Porterbuddy, Svosj og Helt hjem fraktløsninger.

I tillegg har vi integrasjoner mot EDI slik som Logistra Cargonizer og Consignor.
`
        },
        {
            heading: "Hvordan kan jeg gjøre Magentobutikken min raskere?",
            content: `
Å forbedre hastigheten på en Magentobutikk er noe vi har jobbet mye med for flere kunder. Det finnes noen raske tiltak, men dette kan også være en tidkrevende prosess.

Overordnet er det tre momenter vi fokuserer på:

 

#### Optimalisering av koden på siden

Dette er for å være sikker på at denne ikke er unødvendig ressurskrevende eller har feil. I tillegg går vi gjennom og sørger for at ulike ting lastes i riktig rekkefølge, og at ting som brukeren ikke ser med en gang lastes inn til slutt. Vi setter også opp optimaliserte cachingløsninger for siden.

 

#### Optimalisering av driftsmiljø

Alle sider vi drifter i våre Magentooptimaliserte skybaserte miljøer dimensjoneres i forhold til sidens besøk og kompleksitet. Vi passer på at de riktig cachingmekanismene er satt opp, autoskalering er aktuelt i noen tilfeller, samt at vi benytter Content Delivery Networks når det er på sin plass.

 

#### Sørge for at sidestørrelsen ikke er for stor

Dette er det enkleste tiltaket, og noe du gjerne kan gjøre selv. Ta en gjennomgang av siden din og sørg for at alle bildene er optimalisert for web, og at du ikke laster inn unødvendig store ressurser. Jo færre megabytes som skal overføres når en ny besøkende åpner siden din, jo raskere går det.

 

Ta gjerne kontakt med oss for en uforpliktende gjennomgang av din side på [hei@tinyelephant.no](mailto:hei@tinyelephant.no) for en vurdering av hva som kan gjøres.
`
        },
        {
            heading: "5 fordeler med Magento",
            content: `
### Åpen kildekode
Magento er en plattform med åpen kildekode (open source), noe som betyr at kildekoden er åpent tilgjengelig for alle. Dette gjør at det ikke er noen restriksjoner for ulike utviklere å utvide funksjonaliteten som allerede finnes i Magento. Alle kan se kildekoden, og kan dermed lage utvidelsesmoduler som passer på toppen av denne. Et eksempel på det motsatte kan for eksempel være Microsoft Word. Her er kildekoden proprietær, og ikke åpen for innsyn.

Siden kildekoden er åpen har dette ført til at det også finnes en egen markedsplass for tilleggsmoduler laget av tredjepartsutviklere kalt Magento Connect. Denne kan sammenlignes med Apples App Store. Her finnes et stort utvalg ulike modeler som utvidere standarfunksjonaliteten i Magento.

### Stor brukermasse med stort brukerforum
Åpen kildekode i kombinasjon med svært mange brukere av Magento har også ført til at det finnes et stort brukerforum med alt fra nybegynnere til eksperter som svarer på spørsmål og diskuterer ulike utfordringer. Har man en utfordring med Magento, er sannsynligheten stor for at minst én av de 250 000 andre butikkene som også bruker Magento har hatt samme utfordringen. Med litt tålmodighet kan man finne svar på det meste på Magento sitt brukerforum.

### Gratis i Community utgave
Magento kommer i to utgaver: Community og Enterprise. For de fleste butikker er Magento Community tilstrekkelig – og den er også gratis!

### Skalerbarhet
Magento er en svært skalerbar plattform. Det betyr at den kan brukes av butikker med få transaksjoner og varelinjer, og opp til de som har stor omsetning og hundretusenvis av varelinjer. Magento er også tilrettelagt for å kjøre butikker på ulike språk for ulike markeder med ulike valutaer og betalingstjenester. Så dette er ikke en plattform man vokser ut av.

### Fleksibilitet
På bakgrunn av sin åpne kildekode er plattformen svært fleksibel. Alt kan lages – men noe er selvsagt litt mer komplisert. Dette gjelder alt fra tilpasning av utseende og bygging av ny funksjonalitet, til integrasjoner mot tredjepartssystemer via et omfattende API.
`
        },
        {
            heading: "Hvilke moduler til Magento bør jeg unngå?",
            content: `
En av de store fordelene med Magento som plattform, er det store utvalget av tilleggsmoduler som er tilgjengelig via deres egen ”appstore”, Magento Connect. Siden Magento er en ”open source” plattform, og brukes av svært mange nettbutikker over hele verden, er det veldig mange andre som har hatt ønske om akkurat den samme funksjonaliteten som deg. Da har noen ofte laget en ”extension” som løser nettopp dette behovet.

Siden mengden tilgjengelige moduler er så stor, er det grunn til å være litt på vakt. Langt fra alle er programmert med hensyn til Magentos ”best practice”, og du risikerer at modulen ikke virker som den skal, og i verste fall kommer i konflikt med noe annet på nettsiden din. Derfor er første bud å se på moduler fra anerkjente selskaper. Gjerne de som har Magento sertifiseringer. Du må også sjekke at modulen er kompatibel med din versjon av Magento, og at modulen blir oppdatert i takt med at det kommer nye versjoner og sikkerhetsoppdateringer.

Videre kan det være lurt å prøve å ikke kombinere for mange ulike extensions. Jo flere extensions du bruker, og fra flere utviklere de kommer, jo større er sannsynligheten for at noe kommer i konflikt med hverandre. Det å feilsøke slike konflikter kan være tidkrevende, og dermed kostbart. Du bør ikke alltid se etter den billigste modulen, og husk at hvis ting ikke virker som det skal, er innkjøpsprisen på modulen ofte den minste kostnaden for å rette opp i uventede feil en dårlig modul kan skape.
`
        },
        {
            heading: "Det har kommet ut en oppdatering til Magento. Hva så?",
            content: `
Nettbutikker er attraktive mål for hackere siden de inneholder personlig informasjon om kunder, og i noen tilfeller betalingsinformasjon, som brukes for å gjennomføre et salg. Selv om nettbutikken ikke selv håndterer selve betalingen, men at denne gjøres gjennom andre betalingsløsninger som for eksempel DIBS eller Paypal, kan en hacker rute trafikken til falske betalingssider for å innhente betalingsinformasjon. Hvis en nettbutikk blir utsatt for hackerangrep, vil det kunne medføre store negative konsekvenser, både for dens kunder og butikken selv. For kundene kan eksempler på dette være identitetstyveri og tap av penger, mens for butikken kan resultatet være omdømmetap, erstatningskrav, og økonomiske tap som følge av svindel. Det er derfor svært viktig for nettbutikker å unngå hackerangrep.

Oppdateringer av Magento inneholder sikkerhetspatcher med feilrettinger som Magento lanserer når det har blitt oppdaget sikkerhetshull i Magento butikkplattformen som hackere kan utnytte til å tilegne seg informasjon eller endre løsningen. Det betyr ikke at en nettbutikk nødvendigvis vil bli hacket, eller at disse sikkerhetshullene faktisk har blitt utnyttet, men det er en kjent risiko tilstede for at det kan skje en gang i fremtiden. En Magentoinstallasjon består av et sett med kjernefiler, og så kommer de filene som er de individuelle tilpasningene i hver butikk på toppen av dette. En sikkerhetspatch vil rette svakheter i kjernefilene. Det betyr at hvis nettbutikken har installert tilleggsmoduler som benytter seg av disse kjernefilene, er det en mulighet for at også disse må oppdateres når man legger inn en sikkerhetspatch.

Magento nettbutikker bør være påpasselige med å installere sikkerhetspatcher når de blir tilgjengelige fra Magento. Når en ny sikkerhetspatch er tilgjengelig, vil du bli varslet om dette gjennom en melding i Magento administrasjonspanelet. At du får denne meldingen betyr ikke at en sikkerhetspatch ikke er installert, men at den er tilgjengelig – du kan få beskjed om å huske å installere dem selv om det allerede er gjort.

#### Hvordan vet jeg når jeg må oppdatere Magento?
Dette vil du få beskjed om i Magento administrasjonspanelet.

#### Hvordan installerer jeg en sikkerhetspatch?
Hvis du er kunde hos oss vil vi hjelpe deg med dette.
`
        },
        {
            heading: "Hvilke norske betalingsmoduler finnes til min Magento nettbutikk?",
            content: `
På nettbutikkene vi lager har vi primært benyttet følgende betalingsløsninger:

 

### Vipps
Vipps sin ferdigutviklede modul for Magento 2 fungerer utmerket. Den har også mulighet for å aktivere hurtigkasse med direkte utsjekk fra produktsiden i nettbutikken. Vipps har også en modul som lar dine kunder logge inn i butikken gjennom Vipps, slik at de ikke trenger å huske brukernavn og passord. Tiny Elephant er partner med Vipps.

<https://vipps.no>

 

### Klarna
Klarna Checkout er en av de mest populære betalingsmetodene for våre kunder. Vi benytter oss av ferdige moduler for Magento. Tiny Elephant er partner med Klarna.

<https://www.klarna.com/no/>

 

### Dibs Easy
Dibs Easy har en flott checkoutløsning for Magento. Her kan kunden velge mellom kortbetaling, faktura eller Vipps. Tiny Elephant er partner med Dibs.

<https://dibs.no>

 

### Bambora
Bambora sin betalingsmodul for Magento støtter kortbetaling, faktura og Vipps. Tiny Elephant er partner med Bambora.

<https://www.bambora.com/no/no/>

 

### Paypal
Paypal er innebygget betalingsmetode i Magento, og du trenger kun en Paypalkonto for å sette denne opp.

<https://paypal.com>
`
        },
        {
            heading: "Bør jeg tilby gratis frakt i nettbutikken?",
            content: `
Hvorvidt man bør tilby gratis frakt er avhengig av flere aspekter, og er mer en forretningsmessig vurdering enn en teknisk vurdering, da det å sette opp gratis frakt i de fleste tilfeller er veldig enkelt teknisk. Undersøkelser viser at kunder i gitte tilfeller kan oppfatte fri frakt som en større fordel/rabatt enn det det faktisk er i kroner og øre. Men samtidig så skal man ikke undervurdere sine kunder og deres evner til å veie tilbud fra ulike butikker mot hverandre. Generelt kan man si at godt kommuniserte betingelser rundt betaling og levering er veldig viktig for å senke terskelen for dine kunder til å faktiske gjennomføre et kjøp. [(Se DIBS e-handelsrapport)](http://www.dibs.no/norsk-ehandel) Skjulte kostnader senere i bestillingsprosessen vil av de fleste oppleves som svært negativt.

### Hva gjør dine konkurrenter?
Hvis det er standard praksis i markedet med gratis frakt for de produktene du selger, bør nok du også ha det. Du kan selvfølgelig også ha fri frakt selv om alle konkurrentene dine tar betalt for frakt – og det kan ofte være et konkurransefortrinn.

### Fri frakt som en kampanje
Gratis frakt kan være en veldig god kampanje, som kan bidra til at flere gjennomfører kjøp. Dette kan det være lurt å eksperimentere litt med, og måle resultatene av kampanjen, for deretter vurdere ROI. Da er det viktig å ha satt opp gode måleverktøy, for eksempel [Google Analytics](https://analytics.google.com/).

### Fri frakt over et visst beløp
Det vanligste i mange nettbutikker er å tilby fri frakt når man handler for mer enn et visst beløp. Hva dette beløpet skal være, kan man gjerne måle og teste litt frem og tilbake på. Her er målsetningen å øke verdien av gjennomsnittlig handlekurv. Hvis man for eksempel ser at gjennomsnittlig handlekurv i dag er på 500 kr, så kan man jo prøve med fri frakt over 750 kr. Det er lurt å vise veldig tydelig hva som er betingelsene for å oppnå tilbudet, og gjerne ha en grafisk nedtelling som sier noe om ”Handle for X kr mer, og få fri frakt!”.
`
        },
    ];
}