import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";

import {ClientsTemplate, testMarkdown, TWOCOLUMNS} from "~/components/ClientsTemplate";
import {marked} from "marked";

import styles from "~/styles/markdown.css";

export function links() {
    return [{ rel: "stylesheet", href: styles }];
}

export const loader = async ({ params }: LoaderArgs) => {

    const client = {
        markdown: marked(testMarkdown),
        name: 'Test project',
        url: 'https://testproject.no/',
        pageImageUrl: '/images/ferner.jpg',
        content: 'Check out app/routes/admin/works/example.tsx or https://www.markdownguide.org/cheat-sheet/ for markdown syntax.' +
            ' ---------------------  ' +
            'Rottefella er en norsk utendørs pioner og verdens største utvikler og produsent av langrenns-, telemark- og fjellski-bindinger. Med nesten 100 års erfaring og kunnskap utvikler vi produkter som skaper flotte utendørsopplevelser og gode prestasjoner. Vår visjon er å inspirere alle til en aktiv livsstil utendørs og sørge for topp prestasjoner til de beste.',

        template: TWOCOLUMNS
    }

    return json({ client });
};

export default function ClientRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <ClientsTemplate clientData={data} />
    );
}