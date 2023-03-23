export const Noimage = ({client}) => {
    return (
        <div className={"max-w-[960px] px-10 py-6 mx-auto"}>
            <h2 className={"text-3xl pb-8 sm:text-6xl"}>{client.name}</h2>
            <p className={"pb-16 sm:text-3xl"}>{client.content}</p>

            <div className={"flex flex-wrap -mx-6"}>
                <a href={client.url} target="_blank" className={"underline p-2 mx-4"}>{client.url}</a>
                <ul className={"flex"}>
                    <li className={"bg-white py-2 px-4 mx-4"}>magento</li>
                    <li className={"bg-white py-2 px-4 rounded-full mx-4"}>nettbutikk</li>
                </ul>
            </div>
        </div>
    )
}