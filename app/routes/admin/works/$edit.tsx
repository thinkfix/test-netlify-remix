import type { ActionArgs } from "@remix-run/node";

import {useActionData, useLoaderData} from "@remix-run/react";
import {json, LoaderArgs, redirect, unstable_parseMultipartFormData} from "@remix-run/node";
import {db} from "~/utils/db.server";

import ClientForm from "~/components/ClientForm";

import {
    validateClientName,
    validateClientUrl,
    validateClientContent,
    validateClientTemplate
} from "~/utils/validation";

import {badRequest} from "~/utils/request.server";
import {uploadHandler} from "~/utils/upload.cloudinary";

export const action = async ({ request }: ActionArgs) => {

    const form = await unstable_parseMultipartFormData(
        request,
        uploadHandler
    );

    const name      =   form.get("name");
    const url       =   form.get("url");
    let imageUrl    =   form.get("image_url");
    let pageImageUrl =  form.get("page_image_url");
    const content   =   form.get("content");
    const markdown  =   form.get("markdown");
    const template  =   form.get("template");

    if (imageUrl && imageUrl.size === 0) {
        imageUrl = ""
    }

    if (pageImageUrl && pageImageUrl.size === 0) {
        pageImageUrl = ""
    }

    if (
        typeof name !== "string" ||
        typeof url !== "string" ||
        typeof content !== "string" ||
        typeof template !== "string"
    ) {
        return badRequest({
            fieldErrors: null,
            fields: null,
            formError: `Form not submitted correctly.`,
        });
    }

    const fieldErrors = {
        name: validateClientName(name),
        url: validateClientUrl(url),
        content: validateClientContent(content),
        template: validateClientTemplate(template)
    };

    const fields = { name, url, imageUrl, content, pageImageUrl, markdown, template };

    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({
            fieldErrors,
            fields,
            formError: null,
        });
    }

    const isExist = await db.client.findUnique({
        where: {
            name
        }
    });

    isExist ?
        await db.client.update({ where: { name: name }, data: fields }) :
        await db.client.create({ data: fields })

    return redirect(`/admin/works`);
};

export const loader = async ({ params }: LoaderArgs) => {
    const client = await db.client.findUnique({
        where: { id: params.edit },
    });
    if (!client) {
        throw new Error("Client not found");
    }
    return json({ client });
};

export default function EditClient() {
    const actionData = useActionData<typeof action>();
    const clientData = useLoaderData();

    return (
      <ClientForm actionData={ actionData } clientData={ clientData } />
    );
}