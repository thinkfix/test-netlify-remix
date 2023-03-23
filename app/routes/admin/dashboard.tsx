import type { LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireAdminId } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
    await requireAdminId(request);
    return json({});
};

export default function Dashboard() {

    return (
        <>
            <h2 className={"text-4xl py-8"}>admin dashboard</h2>
            <ul>
                <li>
                    <div><Link className={"underline text-2xl"} to="/admin/works">works</Link></div>
                </li>
                <li>
                    <div><Link className={"underline text-2xl"} to="/admin/faqs">faqs</Link></div>
                </li>
            </ul>
        </>
);
}
