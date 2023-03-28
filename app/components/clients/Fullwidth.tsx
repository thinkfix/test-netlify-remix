export const Fullwidth = ({client}) => {
    return (
        <div className={"-mt-[72px] -z-10 lg:-mt-[128px] relative"}>
            <div className={"w-full h-[100px] bg-gradient-to-b from-white to-transparent absolute top-0 left-0 z-20"}/>
            <div className={"relative z-10 pb-[40%] overflow-hidden"}>
                <div className={"absolute inset-x-0 top-1/2 -translate-y-1/2"}>
                    <img className={"w-full object-cover object-center"} width="1920" height="1080" src={client.pageImageUrl} alt={client.name}/>
                </div>
                <h2 className={"text-3xl pb-4 sm:pb-12 sm:text-6xl absolute px-10 sm:px-16 bottom-0 text-white drop-shadow-lg"}>{client.name}</h2>
            </div>

            <div className={"max-w-[960px] px-10 py-6 mx-auto sm:flex sm:py-12"}>
                <div className={"flex flex-wrap -mx-6 pb-8 sm:px-4"}>
                    <a href={client.url} target="_blank" className={"underline p-2 mx-4 mb-8"}>{client.url}</a>
                    <ul className={"flex items-start"}>
                        <li className={"bg-white py-2 px-4 mx-4"}>magento</li>
                        <li className={"bg-white py-2 px-4 rounded-full mx-4"}>nettbutikk</li>
                    </ul>
                </div>
                <p className={"sm:text-3xl sm:px-4"}>{client.content}</p>
            </div>
        </div>
    )
}