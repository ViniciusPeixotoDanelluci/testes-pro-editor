import { redirect } from '@sveltejs/kit';
import { type Handle } from '@sveltejs/kit/hooks';

declare global {
    namespace App {
        interface Locals {
            userAuth: boolean;
            jonas: boolean;
        }
    }
}

export const handle: Handle = async ({ event, resolve }) => {
    const accessToken = event.cookies.get('session_token');
    console.log("hook print", event.locals)

    if (event.url.pathname.startsWith('/editor')) {
        event.locals.jonas = true
    }
    console.log("hook print2", event.locals)
    if (accessToken) {
        // Optional: decode JWT locally or verify token payload
        event.locals.userAuth = true;
    } else {
        event.locals.userAuth = false;
    }

    // Protect protected layouts/routes
    if (event.url.pathname.startsWith('/admin') && !event.locals.userAuth) {
        // throw redirect(303, '/login');
    }

    return resolve(event);
};
