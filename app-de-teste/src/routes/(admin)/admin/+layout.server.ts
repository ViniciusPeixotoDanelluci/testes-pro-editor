import { redirect } from '@sveltejs/kit'
import { ROLE } from '$app/env/private'

// testar fazer isso na versão antiga primeiro, e ver o que mudou no SVK3

export function load({ locals }) {
    console.log("locais", locals)
    // if (!locals.userAuth) redirect(303, '/login');
    // if (locals.userAuth.role !== 'ADMIN') error(403, 'Forbidden');

}
