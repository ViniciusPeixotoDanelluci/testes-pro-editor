// src/routes/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, ActionsFailure } from './$types';
import { Role } from '../../role-enum';

export async function load({ cookies, locals }) {
    const token = cookies.get('session_token')

    console.log("locais", locals)
    console.log("token", token)
    // a ideia é checar se tem um token, se não tiver, é pra limpar
    // o usuário no forms e criar outro token se não, não faz nada

    if (!token) return { clearUser: true }
    return { clearUser: false } // possivelmente faria mais sentido um redirect do que passar uma variavel que diz que é pra eu limpar o usuário ou que ele não esta la
}

export const actions: Actions = {
    login: async ({ request, cookies, fetch }) => {
        const formData = await request.formData();
        const username = formData.get('username')//??formData.get('teamname');
        const password = formData.get('password');

        const accountType = Role.ADMIN

        if (!username || !password) {
            return fail(400, { username, error: 'Nome e senha são necessários.' });
        }

        try {
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, accountType })
            })

            if (!response.ok) {
                const errResponse = await response.json().catch(() => ({  }));
                return fail(response.status, { 
                    username, 
                    error: errResponse.message || 'Usuário ou Senha inválidos.' 
                });
            }

            const { accessToken, refreshToken } = await response.json();

            console.log("ACESSO E TOKEN", accessToken, refreshToken)
            console.log("resposta", response)

            cookies.set('access_token', accessToken, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'PRODUCTION',
                sameSite: 'strict',
                maxAge: 60 * 15
            });

            if (refreshToken) {
                cookies.set('refresh_token', refreshToken, {
                    path: '/',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'PRODUCTION',
                    sameSite: 'strict',
                    maxAge: 60 * 60
                });
                console.log(60*60*5)
            }
        } catch (err) {
            return fail(500, { username, error: 'Autenticação indisponível, tente de novo mais tarde' });
        }

        throw redirect(303, '/editor');
    }
};