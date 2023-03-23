import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import {marked} from "marked";

import accordion from 'react-accessible-accordion/dist/fancy-example.css';
import styles from "~/styles/faq.css";
import markdown from "~/styles/markdown.css";
import {json, LoaderArgs} from "@remix-run/node";
import {db} from "~/utils/db.server";
import {useLoaderData} from "@remix-run/react";

export function links() {
    return [
        { rel: "stylesheet", href: accordion },
        { rel: "stylesheet", href: markdown },
        { rel: "stylesheet", href: styles }
    ];
}

export const loader = async ({ params }: LoaderArgs) => {
    const faqs = await db.faq.findMany({
        select: {
            id: true, heading: true, content: true
        },
    })

    if (!faqs) {
        throw new Error("FAQ items not found");
    }
    return json({ faqs });
};

export default function Faq() {
    const {faqs} = useLoaderData<typeof loader>();

    return (
        <div className={"max-w-[880px] mx-auto px-10 pb-8"}>
            <h2 className={"text-4xl sm:text-6xl pb-4 sm:pb-12"}>Spørsmål og svar</h2>
            <p className={"text-3xl pb-8"}>
                Siden vil stadig fylles ut med nye svar, og har du et spørsmål som du gjerne vil ha besvart om Magento, nettbutikk eller noe annet, er det bare å sende oss en epost på <a className={"underline bg-te-primary-0 px-4"} href="mailto:hei@tinyelephant.no">hei@tinyelephant.no</a>
            </p>
            <Accordion allowZeroExpanded>
                {faqs.map((faq) => (
                    <AccordionItem key={faq.id}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                {faq.heading}
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(faq.content) }}/>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}