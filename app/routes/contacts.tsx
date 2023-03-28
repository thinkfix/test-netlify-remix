import ContactMap from "~/components/ContactMap";

export default function Contacts() {

    const founders = [
        {
            name: "Svein Økland",
            photo: "svein.webp",
            description: "Svein er daglig leder i Tiny Elephant og sertifisert Magento Solution Specialist. Han har bakgrunn som sivilingeniør fra NTNU og har jobbet med netthandel siden 2011.",
            competence: "Magento 2.x og 1.x arkitektur og funksjonalitet, analyse, brukervennlighet og UX",
            email: "svein@tinyelephant.no",
            phone: "+47 907 70 363",
            color: "bg-te-primary-120"
        },
        {
            name: "Ole Tovsen",
            photo: "ole.webp",
            description: "Ole er prosjektleder i Tiny Elephant og sertifisert Magento Solution Specialist. Han har bakgrunn som sivilingeniør fra NTNU og har jobbet med netthandel siden 2012.",
            competence: "Magento 2.x og 1.x arkitektur og funksjonalitet, Git, Agile metoder, SEO og White box QA",
            email: "ole@tinyelephant.no",
            phone: "+47 957 58 729",
            color: "bg-te-primary-30"
        }
    ]


    return (
        <>
            <div className={"max-w-[1024px] mx-auto"}>
                <div className={"text-center text-3xl px-10 py-16"}>
                    hei@tinyelephant.no <br/>
                    +47 22 34 32 34
                </div>
                <ul className={"flex flex-wrap"}>
                    {
                        founders.map(founder => {
                            return (
                                <li className={"group md:w-1/2 p-2"} key={founder.name}>
                                    <div className={founder.color + " relative flex flex-wrap md:block rounded-b-[28px] overflow-hidden group-hover:overflow-visible"}>
                                        <div className={founder.color + " p-10 top-0 relative group-hover:top-full order-3 md:order-0 md:absolute transition-all overflow-hidden rounded-b-[28px]" }>
                                            {founder.description} <br/>

                                            Nøkkelkompetanse: <br/>
                                            {founder.competence} <br/>

                                            {founder.email} <br/>
                                            t: {founder.phone}

                                        </div>
                                        <img className={"relative"} src={founder.photo} alt={founder.name}/>
                                        <div className={"p-4 text-center text-2xl absolute top-0 group-hover:top-0 group-hover:absolute md:relative md:top-full transition-all"}>{founder.name}</div>
                                    </div>
                                </li>
                            )
                        })
                    }


                </ul>
                <div className={"text-center text-3xl px-10 py-16"}>
                    Tiny Elephant AS <br/>
                    Frydenbergveien 46B <br/>
                    4. etasje <br/>
                    0575 Oslo
                </div>
            </div>
            {/*<ContactMap/>*/}
        </>
    )
}