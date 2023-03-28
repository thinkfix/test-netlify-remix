import bcrypt from "bcryptjs";
import {
    createCookieSessionStorage,
    redirect,
} from "@remix-run/node";

import { db } from "./db.server";
import * as Sentry from "@sentry/remix";

Sentry.init({
    dsn: "https://bd32a7ac0ac64c5f80fd25bd727f5c79:b0f0f265ff2445e38b4a08641c5c5d35@o4504576276037632.ingest.sentry.io/4504916542488576",
    tracesSampleRate: 1,
    integrations: [new Sentry.Integrations.Prisma({ client: db })],
});

type LoginForm = {
    username: string;
    password: string;
};

export async function register({
                                   username,
                                   password,
                               }: LoginForm) {
    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await db.admin.create({
        data: { username, passwordHash },
    });
    return { id: admin.id, username };
}

export async function login({
                                username,
                                password,
                            }: LoginForm) {
    const user = await db.admin.findUnique({
        where: { username },
    });
    if (!user) return null;

    const isCorrectPassword = await bcrypt.compare(
        password,
        user.passwordHash
    );
    if (!isCorrectPassword) return null;

    return { id: user.id, username };
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
    cookie: {
        name: "RJ_session",
        // normally you want this to be `secure: true`
        // but that doesn't work on localhost for Safari
        // https://web.dev/when-to-use-local-https/
        secure: process.env.NODE_ENV === "production",
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
});

function getAdminSession(request: Request) {
    return storage.getSession(request.headers.get("Cookie"));
}

export async function getAdminId(request: Request) {
    const session = await getAdminSession(request);
    const adminId = session.get("adminId");
    if (!adminId || typeof adminId !== "string") return null;
    return adminId;
}

export async function requireAdminId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
) {
    const session = await getAdminSession(request);
    const adminId = session.get("adminId");
    if (!adminId || typeof adminId !== "string") {
        const searchParams = new URLSearchParams([
            ["redirectTo", redirectTo],
        ]);
        throw redirect(`/admin?${searchParams}`);
    }
    return adminId;
}

export async function getAdmin(request: Request) {
    const adminId = await getAdminId(request);
    if (typeof adminId !== "string") {
        return null;
    }

    try {
        const admin = await db.admin.findUnique({
            where: { id: adminId },
            select: { id: true, username: true },
        });
        return admin;
    } catch {
        throw logout(request);
    }
}

export async function logout(request: Request) {
    const session = await getAdminSession(request);
    return redirect("/admin", {
        headers: {
            "Set-Cookie": await storage.destroySession(session),
        },
    });
}

export async function createAdminSession(
    adminId: string,
    redirectTo: string
) {
    const session = await storage.getSession();
    session.set("adminId", adminId);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session),
        },
    });
}