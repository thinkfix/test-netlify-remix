import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { Link } from "@remix-run/react";

export function MenuContent(props) {
    const {mobile} = props;
    return (
        <ul className={mobile?"block text-4xl":"hidden md:flex px-8 lg:px-16"} role="list">
            <li className={"px-[25px]"}><Link to="/works">arbeider</Link></li>
            <li className={"px-[25px]"}><Link to={"/tjenester"}>tjenester</Link></li>
            <li className={"px-[25px]"}><Link to={"/faq"}>faq</Link></li>
            <li className={"px-[25px]"}><Link to={"/contacts"}>kontakt</Link></li>
        </ul>
    )
}


export default function Header() {
    const [open, setOpen] = useState(false)

    return (
        <div className={"flex justify-between py-5 px-10 lg:py-10 lg:px-14 text-2xl lg:text-4xl leading-8 lg:leading-12 tracking-tighter transition-all"}>
            <header>
                <h1><Link className={""} to="/">tinyelephant</Link></h1>
            </header>
            <nav>
                <span className={"md:hidden"} onClick={()=>setOpen(true)}>meny</span>
                <MenuContent mobile={false}/>
            </nav>
            <Link className={"bg-te-primary-270 fixed p-5 bottom-0 right-0 text-2xl"} to={"/admin"}>admin</Link>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <MenuContent mobile={true}/>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}