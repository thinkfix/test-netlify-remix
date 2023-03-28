import { Link } from "@remix-run/react";

export default function Works( props: { clients: { clientListItems:{ id: string; name: string; url: string; imageUrl:string; content: string; color: string; }[]}; } ) {
    const {clients} = props;

    return (
        <div className={"flex items-center justify-center"}>
            <ul className={"flex flex-wrap center max-w-[1200px] mx-auto"}>
                {clients.map((client) => (
                    <li key={client.id} className={"flex flex-wrap w-full sm:w-1/2 mb-8 px-5 min-w-[300px]"}>
                        <Link className={"w-full"} to={'/works/'+ client.id}>
                            <div className={"relative pb-[65%] w-full overflow-hidden"}>
                                <img className={"absolute w-full top-1/2 -translate-y-1/2"} src={client.imageUrl ? client.imageUrl : 'works.webp' } alt={client.name}/>
                            </div>
                            <div className={client.color + " " + "w-full rounded-b-[24px]" }>
                                <div className={"p-8 pt-4"}>
                                    <span className={"text-3xl capitalize"}>{client.name}</span>
                                    <ul className={"flex flex-wrap pt-4"}>
                                        <li className={"bg-white p-1 text-sm mr-2"}>magento</li>
                                        <li className={"bg-white p-1 text-sm mr-2 rounded-full"}>nettbutikk</li>
                                    </ul>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}