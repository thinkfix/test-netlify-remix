import {useState} from "react";
import {FULLWIDTH, NOIMAGE, TWOCOLUMNS} from "~/components/ClientsTemplate";
import GoBack from "~/components/GoBack";
import {Link} from "@remix-run/react";
import {TrashIcon} from "@heroicons/react/24/outline";

type ClientType = {
    name: string;
    url: string;
    imageUrl?: string;
    pageImageUrl?: string;
    content: string;
    markdown?: string;
    template: string;
}

type ClientData = {
    client: ClientType
}

type ActionData = {
    fields: ClientType,
    fieldErrors: ClientType,
    formError: boolean
}

export default function ClientForm( props: {actionData:ActionData, clientData?:ClientData} ) {
    const { actionData, clientData } = props;
    const [ imageUrl, setImageUrl ] = useState(clientData?.client?.imageUrl || actionData?.fields?.imageUrl);
    const [ pageImageUrl, setPageImageUrl ] = useState(clientData?.client?.pageImageUrl || actionData?.fields?.pageImageUrl);

    const deleteImageHandler = function () {
        setImageUrl("");
    }
    const deletePageImageHandler = function () {
        setPageImageUrl("");
    }

    return (
        <div className={"max-w-[800px] mx-auto pb-10"}>
            <h2 className={"text-4xl py-8"}>{clientData ? "client page edit" : "new client page"}</h2>
            <form method="post" encType="multipart/form-data">
                <div className={"pb-4"}>
                    <label>
                        <div className={"w-full lowercase pb-2 text-sm text-gray-500"}>Client company name:</div>
                        <input
                            className={"w-full bg-transparent border-0 border-b-1 border-b border-black focus:ring-0 focus:border-te-primary-270" }
                            type="text"
                            defaultValue={ clientData?.client?.name || actionData?.fields?.name }
                            name="name"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.name) ||
                                undefined
                            }
                            aria-errormessage={
                                actionData?.fieldErrors?.name
                                    ? "name-error"
                                    : undefined
                            }
                        />
                    </label>
                    {actionData?.fieldErrors?.name ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="name-error"
                        >
                            {actionData.fieldErrors.name}
                        </p>
                    ) : null}

                </div>
                <div className={"pb-4"}>
                    <label>
                        <div className={"w-full lowercase pb-2 text-sm text-gray-500"}>
                            Client site URL:
                        </div>

                        <input
                            className={"w-full bg-transparent border-0 border-b-1 border-b border-black focus:ring-0 focus:border-te-primary-270" }
                            type="text"
                            defaultValue={ clientData?.client?.url || actionData?.fields?.url}
                            name="url"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.url) ||
                                undefined
                            }
                            aria-errormessage={
                                actionData?.fieldErrors?.url
                                    ? "url-error"
                                    : undefined
                            }
                        />
                    </label>
                    {actionData?.fieldErrors?.url ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="url-error"
                        >
                            {actionData.fieldErrors.url}
                        </p>
                    ) : null}
                </div>

                <div className={"pb-4 mb-4 border-b border-black"}>
                    <label>
                        <div className={"w-full lowercase pb-2 text-sm text-gray-500"}>
                            List image:
                        </div>

                        { (imageUrl) ? (
                            <>
                                <img width="300" src={imageUrl} alt={clientData?.client?.name || actionData?.fields?.name}/>
                                <input name="image_url" type="hidden" value={imageUrl}/>
                                <div onClick={deleteImageHandler} className={"mt-4"}>
                                    <TrashIcon className={"w-6 h-6 text-red-500 cursor-pointer"}/>
                                </div>
                            </>
                        ) : (
                            <>
                                <input name="image_url"
                                       type="file"
                                       accept="image/*"/>
                                <div onClick={deleteImageHandler} className={"mt-4"}>
                                    <TrashIcon className={"w-6 h-6 text-red-500 cursor-pointer"}/>
                                </div>
                            </>
                        ) }

                    </label>
                </div>

                <div className={"pb-4 mb-4 border-b border-black"}>
                    <label>
                        <div className={"w-full lowercase pb-2 text-sm text-gray-500"}>
                            Page image:
                        </div>
                        { (pageImageUrl) ? (
                            <>
                                <img width="300" src={pageImageUrl} alt={clientData?.client?.name || actionData?.fields?.name}/>
                                <input name="page_image_url" type="hidden" value={pageImageUrl}/>
                                <div onClick={deletePageImageHandler} className={"mt-4"}>
                                    <TrashIcon className={"w-6 h-6 text-red-500 cursor-pointer"}/>
                                </div>
                            </>
                        ) : (
                            <>
                                <input name="page_image_url"
                                       type="file"
                                       accept="image/*"/>
                                <div onClick={deletePageImageHandler} className={"mt-4"}>
                                    <TrashIcon className={"w-6 h-6 text-red-500 cursor-pointer"}/>
                                </div>
                            </>
                        ) }
                    </label>
                </div>

                <div className={"pb-4"}>
                    <label>
                        <div className={"w-full lowercase pb-2 text-sm text-gray-500"}>
                            Description:
                        </div>

                        <textarea
                            className={"w-full min-h-[200px] bg-transparent border-0 border-b-1 border-b border-black focus:ring-0 focus:border-te-primary-270"}
                            defaultValue={clientData?.client?.content || actionData?.fields?.content}
                            name="content"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.content) ||
                                undefined
                            }
                            aria-errormessage={
                                actionData?.fieldErrors?.content
                                    ? "content-error"
                                    : undefined
                            }
                        />
                    </label>
                    {actionData?.fieldErrors?.content ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="content-error"
                        >
                            {actionData.fieldErrors.content}
                        </p>
                    ) : null}
                </div>
                <div className={"pb-4"}>
                    <label>
                        <div className={"w-full lowercase pb-2 text-sm text-gray-500"}>
                            Markdown:
                        </div>

                        <textarea
                            className={"w-full min-h-[200px] bg-transparent border-0 border-b-1 border-b border-black focus:ring-0 focus:border-te-primary-270"}
                            defaultValue={clientData?.client?.markdown || actionData?.fields?.markdown}
                            name="markdown"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.markdown) ||
                                undefined
                            }
                            aria-errormessage={
                                actionData?.fieldErrors?.markdown
                                    ? "markdown-error"
                                    : undefined
                            }
                        />
                    </label>
                    {actionData?.fieldErrors?.markdown ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="markdown-error"
                        >
                            {actionData.fieldErrors.markdown}
                        </p>
                    ) : null}
                </div>
                <div className={"pb-4"}>
                    <label>
                        <div className={"w-full lowercase pb-2 text-sm text-gray-500"}>
                            Template:
                        </div>

                        <select
                            className={"w-full bg-transparent border-0 border-b-1 border-b border-black focus:ring-0 focus:border-te-primary-270" }
                            defaultValue={clientData?.client?.template || actionData?.fields?.template}
                            name="template"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.template) ||
                                undefined
                            }
                            aria-errormessage={
                                actionData?.fieldErrors?.template
                                    ? "template-error"
                                    : undefined
                            }
                        >
                            <option value={NOIMAGE}>{NOIMAGE}</option>
                            <option value={FULLWIDTH}>{FULLWIDTH}</option>
                            <option value={TWOCOLUMNS}>{TWOCOLUMNS}</option>
                        </select>
                    </label>
                    {actionData?.fieldErrors?.template ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="template-error"
                        >
                            {actionData.fieldErrors.template}
                        </p>
                    ) : null}
                </div>
                <div className={"pb-4"}>
                    {actionData?.formError ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                        >
                            {actionData.formError}
                        </p>
                    ) : null}
                    <button type="submit" className={"min-w-[150px] px-6 py-2 border-2 border-black bg-te-primary-120 rounded-full hover:bg-transparent"}>{clientData?.client ? 'Save' : 'Add'}</button>
                </div>
            </form>
        </div>
    );
}