import type { LoaderArgs } from "@remix-run/node";
import {Link, Outlet} from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireAdminId } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
    await requireAdminId(request);
    return json({});
};

export default function AdminWorksRouter() {
    return (
        <>
            <Outlet/>
        </>
    );
}
