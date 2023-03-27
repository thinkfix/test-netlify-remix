import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { Link, useLoaderData } from "@remix-run/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

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

    await db.faq.delete({ where: { id: form.get("faqid") } });
    return null;
};

export const loader = async ({request}: LoaderArgs) => {
    return json({
        faqsItems: await db.faq.findMany()
    });
};

export default function AdminFaqs() {
    const faqs = useLoaderData<typeof loader>();

    return (
        <>
            <div className={"flex justify-between items-center"}>
                <h2 className={"text-4xl py-8"}>faqs</h2>
                <Link className={"px-6 py-2 ml-auto border-2 border-black bg-te-primary-120 rounded-full hover:bg-transparent"} to="/admin/faqs/new">New</Link>
            </div>
            <ul className={"max-w-[800px] mx-auto pb-10"}>
                {faqs.faqsItems.map((faq) => (
                    <li key={faq.id} className={"flex border-b border-gray-300 mb-2"}>
                        {faq.heading}
                        <Link className={"pr-5 ml-auto"} to={ '/admin/faqs/'+ faq.id}>
                            <PencilSquareIcon className={"w-6 h-6 text-blue-500"}/>
                        </Link>

                        <form method="post" action="/admin/faqs?index">
                            <input type="hidden" name="faqid" value={faq.id} />
                            <button className={"text-purple-600"} name="intent" type="submit" value="delete">
                                <TrashIcon className={"w-6 h-6 text-red-500"}/>
                            </button>
                        </form>

                    </li>
                ))}
            </ul>
        </>

    )
}