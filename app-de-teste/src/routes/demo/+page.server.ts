// src/routes/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { Role } from '../../role-enum';

export async function load({ cookies }) {
    const token = cookies.get('session_token')

    console.log("token", token)
    // a ideia é checar se tem um token, se não tiver, é pra limpar
    // o usuário no forms e criar outro token se não, não faz nada

    if (!token) return { clearUser: true }
    return { clearUser: false, jorge: false } // possivelmente faria mais sentido um redirect do que passar uma variavel que diz que é pra eu limpar o usuário ou que ele não esta la
}