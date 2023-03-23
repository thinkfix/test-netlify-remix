import type {
    ActionArgs
} from "@remix-run/node";
import {
    redirect,
    unstable_parseMultipartFormData,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { uploadHandler } from "~/utils/upload.cloudinary"

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import ClientForm from "~/components/ClientForm";

import {
    validateClientName,
    validateClientUrl,
    validateClientContent,
    validateClientTemplate
} from "~/utils/validation";

export const action = async ({ request }: ActionArgs) => {
    const form = await unstable_parseMultipartFormData(
        request,
        uploadHandler
    );



    const name      =   form.get("name");
    const url       =   form.get("url");
    let imageUrl    =   form.get("image_url");
    const content   =   form.get("content");
    let pageImageUrl =  form.get("page_image_url");
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

    if (!isExist) {
        await db.client.create({ data: fields });
    }

    return redirect(`/admin/works`);
};

export default function NewClientForm() {
    const actionData = useActionData<typeof action>();

    return (
        <ClientForm actionData={actionData} />
    );
}