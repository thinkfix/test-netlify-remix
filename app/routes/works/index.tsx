import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Works from "~/components/Works";

import { db } from "~/utils/db.server";
import { randomColor } from "~/utils/randomColor";

export const loader = async () => {
    const clientList = await db.client.findMany({
        select: {
            id: true, name: true, url: true, content: true, imageUrl: true
        },
    })
    clientList.map((item) => {
        item.color = randomColor();
    })

    return json({
        clientListItems: clientList,
    });
};

export default function WorksRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <Works clients={data.clientListItems}/>
    );
}