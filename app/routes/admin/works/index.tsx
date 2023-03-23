import { Link, useLoaderData } from "@remix-run/react";
import {
    ActionArgs,
    LoaderArgs,
    json,
    redirect
} from "@remix-run/node";

import { db } from "~/utils/db.server";
import { getAdmin } from "~/utils/session.server";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";


export const action = async ({
                                 params,
                                 request,
                             }: ActionArgs) => {
    const form = await request.formData();
    if (form.get("intent") !== "delete") {
        throw new Response(
            `The intent ${form.get("intent")} is not supported`,
            { status: 400 }
        );
    }

    await db.client.delete({ where: { id: form.get("clientid") } });
    return null;
};

export const loader = async ({request}: LoaderArgs) => {
    const admin = await getAdmin(request);
    return json({
        clientListItems: await db.client.findMany(),
        admin
    });
};

export default function AdminWorks() {
    const clients = useLoaderData<typeof loader>();

    return (
        <>
            <div className={"flex justify-between items-center flex-wrap pb-8"}>
                <h2 className={"text-4xl py-8"}>works</h2>
                <Link className={"pr-4 ml-auto underline hover:no-underline"} to="/admin/works/example">example client page</Link>
                <Link className={"px-6 py-2 border-2 border-black bg-te-primary-120 rounded-full hover:bg-transparent"} to="/admin/works/new">New</Link>
            </div>
            <ul className={"max-w-[800px] mx-auto pb-10"}>
                {clients.clientListItems.map((client) => (
                    <li key={client.id} className={"flex border-b border-gray-300 mb-2"}>
                        {client.name}
                        <Link className={"pr-5 ml-auto"} to={ '/admin/works/'+ client.id}>
                            <PencilSquareIcon className={"w-6 h-6 text-blue-500"}/>
                        </Link>

                        <form method="post" action="/admin/works?index" className={""}>
                            <input type="hidden" name="clientid" value={client.id} />
                            <button name="intent" type="submit" value="delete">
                                <TrashIcon className={"w-6 h-6 text-red-500"}/>
                            </button>
                        </form>

                    </li>
                ))}
            </ul>
        </>
    );
}