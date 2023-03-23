export const Twocolumns = ({client}) => {
    return (
        <div className={"sm:flex"}>
            <div className={"sm:w-1/3 md:w-1/2 max-h-[500px] overflow-hidden"}>
                <img className={"w-full"} src={client.pageImageUrl} alt={client.name}/>
            </div>

            <div className={"sm:w-2/3 px-10 py-6 mx-auto sm:py-12"}>
                <h2 className={"text-3xl pb-4 sm:pb-12 sm:text-4xl"}>{client.name}</h2>
                <p className={"sm:text-2xl"}>{client.content}</p>
                <div className={"flex flex-wrap -mx-6 pb-8 items-center"}>
                    <a href={client.url} target="_blank" className={"underline p-2 mx-4 my-8"}>{client.url}</a>
                    <ul className={"flex p-2"}>
                        <li className={"bg-white py-2 px-4 mx-4"}>magento</li>
                        <li className={"bg-white py-2 px-4 rounded-full mx-4"}>nettbutikk</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}