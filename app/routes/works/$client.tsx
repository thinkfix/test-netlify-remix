import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { ClientsTemplate } from "~/components/ClientsTemplate";

import styles from "~/styles/markdown.css";

export function links() {
    return [{ rel: "stylesheet", href: styles }];
}

export const loader = async ({ params }: LoaderArgs) => {
    const client = await db.client.findUnique({
        where: { id: params.client },
    });
    if (!client) {
        throw new Error("Client not found");
    }
    return json({ client });
};

export default function ClientRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <ClientsTemplate clientData={data} />
    );
}