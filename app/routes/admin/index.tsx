import type {
    ActionArgs,
    LoaderArgs,
} from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { badRequest } from "~/utils/request.server";
import { db } from "~/utils/db.server";
import {
    login,
    register,
    createAdminSession,
    getAdmin
} from "~/utils/session.server";
import {
    validateUsername,
    validatePassword,
    validateUrl
} from "~/utils/validation";
import {
    json,
    redirect
} from "@remix-run/node";
import {useState} from "react";

import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export const loader = async ({ request }: LoaderArgs) => {
    const user = await getAdmin(request);
    if (user?.id || typeof user?.id === 'string') {
        throw redirect('/admin/dashboard')
    }

    return json({
        user
    });
};

export const action = async ({ request }: ActionArgs) => {
    const form = await request.formData();
    const loginType = form.get("loginType");
    const username = form.get("username");
    const password = form.get("password");
    const redirectTo = validateUrl(
        form.get("redirectTo") || "/admin/dashboard/"
    );
    if (
        typeof loginType !== "string" ||
        typeof username !== "string" ||
        typeof password !== "string" ||
        typeof redirectTo !== "string"
    ) {
        return badRequest({
            fieldErrors: null,
            fields: null,
            formError: `Form not submitted correctly.`,
        });
    }

    const fields = { loginType, username, password };
    const fieldErrors = {
        username: validateUsername(username),
        password: validatePassword(password),
    };
    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({
            fieldErrors,
            fields,
            formError: null,
        });
    }

    switch (loginType) {
        case "login": {
            const admin = await login({ username, password });
            if (!admin) {
                return badRequest({
                    fieldErrors: null,
                    fields,
                    formError: `Username/Password combination is incorrect`,
                });
            }
            return createAdminSession(admin.id, redirectTo);
        }
        case "register": {
            const userExists = await db.admin.findFirst({
                where: { username },
            });
            if (userExists) {
                return badRequest({
                    fieldErrors: null,
                    fields,
                    formError: `User with username ${username} already exists`,
                });
            }

            const admin = await register({ username, password });
            if (!admin) {
                return badRequest({
                    fieldErrors: null,
                    fields,
                    formError: `Something went wrong trying to create a new user.`,
                });
            }
            return createAdminSession(admin.id, redirectTo);
        }
        default: {
            return badRequest({
                fieldErrors: null,
                fields,
                formError: `Login type invalid`,
            });
        }
    }
};

export default function AdminLogin() {
    const actionData = useActionData<typeof action>()
    const [searchParams] = useSearchParams();

    const [loginType, setLoginType] = useState('login');

    return (
        <div className="flex justify-center max-w-[400px] mx-auto px-4">
            <div className="content w-full" data-light="">
                <ul className={"pb-4"}>
                    <li><span>Username: </span>admin_te</li>
                    <li><span>Password: </span>twixrox</li>
                </ul>

                <Form action="/admin?index" method="post">
                    <input
                        type="hidden"
                        name="redirectTo"
                        value={
                            searchParams.get("redirectTo") ?? undefined
                        }
                    />
                    <fieldset className={"flex items-center pb-4"}>
                        <legend className="sr-only">
                            Login or Register?
                        </legend>
                        <label className={"bg-te-primary-120 inline-block px-4 py-3 w-1/2 text-center cursor-pointer"}>
                            <input
                                className={"hidden"}
                                type="radio"
                                name="loginType"
                                value="login"
                                defaultChecked={
                                    !actionData?.fields?.loginType ||
                                    actionData?.fields?.loginType === "login"
                                }
                                onChange={()=>setLoginType('login')}
                            />{" "}
                            Login
                        </label>
                        <label className={"bg-te-primary-0 inline-block px-4 py-3 w-1/2 text-center cursor-pointer"}>
                            <input
                                className={"hidden"}
                                type="radio"
                                name="loginType"
                                value="register"
                                defaultChecked={
                                    actionData?.fields?.loginType ===
                                    "register"
                                }
                                onChange={()=>setLoginType('register')}
                            />{" "}
                            Register
                        </label>
                    </fieldset>


                    <h2 className={"text-4xl pb-4"}>{loginType}</h2>
                    <div className={"pb-4"}>
                        <label
                            className={"w-full text-sm"}
                            htmlFor="username-input">username</label>


                        <div className={"w-full flex items-center"}>
                            <UserIcon className="mx-2 h-6 w-6 text-gray-500"/>
                            <input
                                className={"w-full bg-transparent border-0 border-b-1 border-b border-black pl-10 -ml-10 focus:ring-0 focus:border-te-primary-270"}
                                type="text"
                                id="username-input"
                                name="username"
                                defaultValue={actionData?.fields?.username}
                                aria-invalid={Boolean(
                                    actionData?.fieldErrors?.username
                                )}
                                aria-errormessage={
                                    actionData?.fieldErrors?.username
                                        ? "username-error"
                                        : undefined
                                }
                            />
                        </div>
                        {actionData?.fieldErrors?.username ? (
                            <p
                                className="form-validation-error text-red-500 text-xs font-light"
                                role="alert"
                                id="username-error"
                            >
                                {actionData.fieldErrors.username}
                            </p>
                        ) : null}
                    </div>
                    <div>
                        <label
                            className={"w-full text-sm"}
                            htmlFor="password-input">password</label>
                        <div className={"w-full flex items-center"}>
                            <LockClosedIcon className="mx-2 h-6 w-6 text-gray-500"/>
                            <input
                                className={"w-full bg-transparent pl-10 -ml-10 border-0 border-b-1 border-b border-black pl-10 -ml-10 focus:ring-0 focus:border-te-primary-270"}
                                id="password-input"
                                name="password"
                                type="password"
                                defaultValue={actionData?.fields?.password}
                                aria-invalid={Boolean(
                                    actionData?.fieldErrors?.password
                                )}
                                aria-errormessage={
                                    actionData?.fieldErrors?.password
                                        ? "password-error"
                                        : undefined
                                }
                            />
                        </div>
                        {actionData?.fieldErrors?.password ? (
                            <p
                                className="form-validation-error text-red-500 text-xs font-light"
                                role="alert"
                                id="password-error"
                            >
                                {actionData.fieldErrors.password}
                            </p>
                        ) : null}
                    </div>
                    <div id="form-error-message">
                        {actionData?.formError ? (
                            <p
                                className="form-validation-error text-red-500 text-xs font-light"
                                role="alert"
                            >
                                {actionData.formError}
                            </p>
                        ) : null}
                    </div>
                    <button type="submit" className="button border-2 border-black mt-4 w-full py-2 hover:bg-black hover:text-white">
                        submit
                    </button>
                </Form>
            </div>
        </div>
    );
}