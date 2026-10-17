import { redirect } from "@sveltejs/kit";

export function load({ locals }) {
    console.log("locais", locals)
    // if (!locals.userAuth) redirect(303, '/login');
    // if (locals.userAuth.role !== 'ADMIN') error(403, 'Forbidden');
}