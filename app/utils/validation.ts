export function validateClientName(name: string) {
    if (name.length < 3) {
        return `That client's name is too short`;
    }
}

export function validateClientUrl(url: string) {
    // const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/;
    const pattern = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/;

    if (!pattern.test(url)) {
        return `Url should have proper format starting from http(s)://`;
    }
}

export function validateImageName(image: string) {
    if ( image ) {
        return 'Choose an image file'
    }
}

export function validateClientContent(content: string) {
    if (content.length < 10) {
        return `That client's description is too short`;
    }
}

export function validateClientTemplate(template: string) {
    if (template.length < 1) {
        return `Need to choose template`;
    }
}

export function validateUsername(username: unknown) {
    if (typeof username !== "string" || username.length < 3) {
        return `Usernames must be at least 3 characters long`;
    }
}

export function validatePassword(password: unknown) {
    if (typeof password !== "string" || password.length < 6) {
        return `Passwords must be at least 6 characters long`;
    }
}

export function validateUrl(url: string) {
    let urls = ["/admin/works/","/admin/dashboard/", "/works/", "/"];
    if (urls.includes(url)) {
        return url;
    }
    return "/admin/works/";
}

export function validateFaqHeading(heading: string) {
    if (heading.length < 3) {
        return `That faq's heading is too short`;
    }
}

export function validateFaqContent(content: string) {
    if (content.length < 3) {
        return `That faq's content is too short`;
    }
}