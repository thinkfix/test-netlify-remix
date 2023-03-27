import type { ActionArgs } from "@remix-run/node";

import { useActionData, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

import { badRequest } from "~/utils/request.server";
import { validateFaqContent, validateFaqHeading } from "~/utils/validation";
import GoBack from "~/components/GoBack";


export const action = async ({ request }: ActionArgs) => {

    const form = await request.formData();

    const id = form.get("id");
    const heading = form.get("heading");
    const content = form.get("content");
    const formType = form.get("formtype");

    if (
        typeof heading !== "string" ||
        typeof content !== "string"
    ) {
        return badRequest({
            fieldErrors: null,
            fields: null,
            formError: `Form not submitted correctly.`,
        });
    }

    const fieldErrors = {
        heading: validateFaqHeading(heading),
        content: validateFaqContent(content)
    };

    const fields = { heading, content};

    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({
            fieldErrors,
            fields,
            formError: null,
        });
    }

    formType === 'edit' ?
        await db.faq.update({ where: { id: id }, data: fields }) :
        await db.faq.create({ data: fields })

    return redirect(`/admin/faqs`);
};

export const loader = async ({ params }: LoaderArgs) => {
    if(params.edit !== 'new') {
        const faq = await db.faq.findUnique({
            where: { id: params.edit },
        });

        if (!faq) {
            throw new Error("Client not found");
        }

        return json( { faq } );
    }

    return null;
};

export default function EditFaq() {
    const actionData = useActionData<typeof action>();
    const faqData = useLoaderData();
    const data = actionData?.fields || faqData?.faq

    return (
        <div className={"max-w-[800px] mx-auto"}>
            <h2 className={"text-4xl py-8"}>{faqData ? "faq edit" : "new faq"}</h2>
            <form method="post">
                <div className={"pb-4"}>
                    <label>
                        <div className={"w-full lowercase pb-2 text-sm text-gray-500"}>
                            Question:
                        </div>

                        <input
                            className={"w-full bg-transparent border-0 border-b-1 border-b border-black focus:ring-0 focus:border-te-primary-270" }
                            type="text"
                            defaultValue={ data?.heading }
                            name="heading"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.heading) ||
                                undefined
                            }
                            aria-errormessage={
                                actionData?.fieldErrors?.heading
                                    ? "heading-error"
                                    : undefined
                            }
                        />
                    </label>
                    {actionData?.fieldErrors?.heading ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="heading-error"
                        >
                            {actionData.fieldErrors.heading}
                        </p>
                    ) : null}

                </div>
                <div className={"pb-4"}>
                    <label>
                        <div className={"w-full lowercase pb-2 text-sm text-gray-500"}>
                            Answer(markdown):
                        </div>

                        <textarea
                            className={"w-full min-h-[200px] bg-transparent border-0 border-b-1 border-b border-black focus:ring-0 focus:border-te-primary-270" }
                            defaultValue={ data?.content }
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
                <div>
                    {actionData?.formError ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                        >
                            {actionData.formError}
                        </p>
                    ) : null}
                    <input type="hidden" name="formtype" value={faqData && 'edit'}/>
                    <input type="hidden" name="id" value={data?.id}/>
                    <button type="submit" className={"min-w-[150px] px-6 py-2 border-2 border-black bg-te-primary-120 rounded-full hover:bg-transparent"}>{faqData ? 'Save' : 'Add'}</button>
                </div>
            </form>
        </div>
    );
}