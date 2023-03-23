import {Link, Outlet, useLoaderData, useNavigate} from "@remix-run/react";
import { json, LoaderArgs} from "@remix-run/node";

import { getAdmin } from "~/utils/session.server";
import GoBack from "~/components/GoBack";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";


export const loader = async ({request}: LoaderArgs) => {
    const admin = await getAdmin(request);
    const url = new URL(request.url)

    console.log("URL",url.pathname)
    return json({
        admin, url: url.pathname
    });
}

export default function AdminRoute() {
    const data = useLoaderData<typeof loader>();

    const backTo = {
        '/admin/dashboard': {
            link: '/',
            text: 'go back'
        },
        '/admin/works': {
            link: '/admin/dashboard',
            text: 'to dashboard'
        },
        '/admin/faq': {
            link: '/admin/dashboard',
            text: 'to dashboard'
        }
    }

    return (
        <div className={"max-w-[1200px] mx-auto px-6"}>
            {data.admin && (
                <div className={"flex justify-between items-center flex-wrap"}>
                    {/*<Link to={backTo[data.url].link} className={"flex items-center px-6 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white"}>*/}
                    {/*    <ArrowLeftIcon className={"w-4 h-4 mr-2"}/><span>{backTo[data.url].text}</span>*/}
                    {/*</Link>*/}
                    <GoBack/>
                    <div className="user-info inline-flex items-center">
                        <span className={"pr-4"}>{`Hi ${data.admin.username}`}</span>
                        <form action="/logout" method="post">
                            <button type="submit" className="button px-6 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white">
                                logout
                            </button>
                        </form>
                    </div>

                </div>

            )}
            <Outlet/>
        </div>

)
}