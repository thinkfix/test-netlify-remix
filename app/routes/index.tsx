import { json } from "@remix-run/node";
import type { DataFunctionArgs } from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {Carousel} from "~/components/Carousel";
import {randomColor} from "~/utils/randomColor";

import Works from "~/components/Works";

import { db } from "~/utils/db.server";

export const loader = async (args: DataFunctionArgs) => {
    const clientList = await db.client.findMany({
        take: 4,
        select: {
            id: true, name: true, url: true, content: true, imageUrl: true
        },
        orderBy: { createdAt: "desc" }
    })

    clientList.map((item) => {
        item.color = randomColor();
    })

    return json({
        clientListItems: clientList
    });
};

export default function Index() {
    const data = useLoaderData<typeof loader>();
    const tagsClasses = "p-3 sm:p-4 lg:p-6 text-xl sm:text-3xl lg:text-5xl mx-2 mb-4 sm:mx-4 sm:mb-8";

    const quotes = [
        {
            text: "Vi laget en robot som sorterer de beste produktene fremst",
            link: "",
            color: "bg-te-primary-0"
        },
        {
            text: "Samarbeidet med Zenostore resulterte i en 209% økning i omsetning på ett år",
            link: "",
            color: "bg-te-primary-150"
        },
        {
            text: "Alle våre ansatte er utdannet på sivilingeniørnivå",
            link: "",
            color: "bg-te-primary-60"
        },
        {
            text: "Vi  har laget en robot som sorterer de beste produktene fremst",
            link: "",
            color: "bg-te-primary-210"
        },
        {
            text: "Se hvordan vi hjalp Element til doblet omsetning på 10 mnd",
            link: "",
            color: "bg-te-primary-300"
        }
    ];

    const companyQuotes = [
        {
            brand: "Zenostore",
            text: "Vi laget en robot som sorterer de beste produktene fremst",
            link: ""
        },
        {
            brand: "Tiny Elephant",
            text: "Samarbeidet med Zenostore resulterte i en 209% økning i omsetning på ett år",
            link: ""
        },
        {
            brand: "Ansatte",
            text: "Alle våre ansatte er utdannet på sivilingeniørnivå",
            link: ""
        },
        {
            brand: "Element",
            text: "Vi har laget en robot som sorterer de beste produktene fremst",
            link: ""
        }
    ];

    const articles = [
        {
            title: "Magento Solution",
            image: "icon1.webp",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            link: "",
        },{
            title: "Åpen kildekode",
            image: "icon2.webp",
            text: "Også kalt for open-source. Det betyr at kildekoden er åpent tilgjengelig for alle. Det gjør at det ikke er noen restriksjoner for ulike utviklere å utvide funksjonaliteten som allerede dinnes i Magento.",
            link: "",
        },{
            title: "Intergrasjon",
            image: "icon3.webp",
            text: "Mange lurer på om Magento Solution har intergrasjon opp mot sine allerede eksisterende systemer som Front Studio, Microsoft Dynamics og Fiken. For det meste er svaret ja!",
            link: "",
        },{
            title: "Fraktleverandører",
            image: "icon1.webp",
            text: "Vi har ferdige løsninger for integrering av blant annet Bring, PostNord, DHL, Porterbuddy, Svosj og Helt Hjem.",
            link: "",
        }
    ]

    const articleCarouselOptions = {
        slidesOffsetBefore: 32,
        slidesOffsetAfter: 32,
        spaceBetween: 16,
        slidesPerView: 1.5,
        breakpoints: {
            1024: {
                slidesPerView: 3.5,
                slidesOffsetBefore: 56,
                slidesOffsetAfter: 56,
            }
        }
    }


    return (
        <>
            <div className="flex justify-center items-center sm:min-h-[400px] px-8 lg:px-14 pb-8">
                <img className="px-16" width="320" height="300" src="mus_klikk.svg" alt="front image"/>
            </div>
            <div className={"flex lg:justify-center px-8 lg:px-14"}>
                <ul className={"flex flex-wrap -mx-4 max-w-5xl sm:max-w-5xl "}>
                    <li className={tagsClasses + " " + "bg-te-primary-0"}>nettbutikk</li>
                    <li className={tagsClasses + " " + "bg-te-primary-180 rounded-full"}>magento</li>
                    <li className={tagsClasses + " " + "bg-te-primary-270 -skew-x-12"}><span className="block skew-x-12">agilitet</span></li>
                    <li className={tagsClasses + " " + "bg-te-primary-120 rounded-full"}>resultat</li>
                    <li className={tagsClasses + " " + "bg-te-primary-60"}>kompetanse</li>
                    <li className={tagsClasses + " " + "bg-te-primary-330"}>internett</li>
                </ul>
            </div>
            <div className={"bg-te-bg-210 p-8 lg:p-14"}>
                <Works clients={data.clientListItems}/>
            </div>
            <div className={"flex flex-wrap px-8 lg:px-14 pt-16 lg:pt-24"}>
                <h2 className={"text-2xl lg:text-4xl"}>Skreddersydde nettbutikker for smarte team.</h2>
            </div>
            <Carousel title={"Ting vi er stolt av"}>
                {quotes.map(quote => {
                    return (
                        <div key={quote.text} className={"p-6 rounded-[24px] flex flex-wrap min-h-[250px] content-center" + " " + quote.color}>
                            <div className={"text-2xl sm:text-3xl pb-3"}>{quote.text}</div>
                            <Link className={"underline"} to={quote.link}>Les mer</Link>
                        </div>
                    )
                })}
            </Carousel>

            <div className={"bg-te-primary-60"}>
                <Carousel title={"Artikler"} {...articleCarouselOptions}>
                    {articles.map(article => {
                        return (
                            <div key={article.title} className={"p-6 rounded-[8px] flex flex-wrap min-h-[250px] content-center bg-white"}>
                                <img src={article.image} width="124" height="124" alt={article.title}/>
                                <h3 className={"text-2xl sm:text-3xl w-full pb-4 text-ellipsis overflow-hidden"}>{article.title}</h3>
                                <div className={"text-lg pb-3 w-full"}>{article.text}</div>
                                <Link className={"underline"} to={article.link}>Les mer</Link>
                            </div>
                        )
                    })}
                </Carousel>
            </div>

            <div className={"max-w-[1200px] mx-auto"}>
                <ul className={"flex flex-wrap"}>
                    {companyQuotes.map(quote => {
                        return (
                            <li key={quote.brand} className={"w-full sm:w-1/2 text-center p-4 sm:p-8 "}>
                                <div className={"hover:bg-white overflow-hidden rounded-xl p-10 transition-all"}>
                                    <span className={"w-full uppercase text-xs"}>{quote.brand}</span>
                                    <div className={"py-4 text-2xl sm:text-3xl"}>{quote.text}</div>
                                    <Link className={"underline text-sm"} to={quote.link}>Les mer</Link>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="w-full">
                <div className="relative shadow-xl sm:overflow-hidden ">
                    <div className="absolute inset-0">
                        <img
                            className="h-full w-full object-cover"
                            src="bg-b-home.webp"
                            alt="contact us background"
                        />
                    </div>
                    <div
                        className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-40 lg:pt-40">
                        <div className="mx-auto mt-6 max-w-lg text-center text-4xl text-white sm:max-w-3xl">
                            Vi er 12 motiverte kollegaer som er klare for å realisere dagens idé i morgen.
                        </div>

                        <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                            <div className="space-y-4 sm:mx-auto">
                                <Link to={''}
                                      className={"rounded-full border border-transparent bg-white p-2 text-base font-medium shadow-sm sm:px-4"}>
                                    Ta kontakt
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}