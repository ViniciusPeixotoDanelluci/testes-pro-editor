// src/routes/login/+page.server.ts
// import { fail, redirect } from '@sveltejs/kit'
// import type { Action, Actions } from '@sveltejs/kit'

// const login: Action = async ({request}) => {
//     const formData = await request.formData()

//     const username = formData.get('username')
//     const password = formData.get('password')

//     console.log(username)
//     console.log(password)

//     if (!username || !password) {
//         return fail(400, { username, error: 'Username and password are required.' })
//     }

//     try {
//         console.log("cheogu 3")
//         const response = await fetch('http://localhost:3000/auth/signin', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password })
//         })

//         if (!response.ok) {
//             const errResponse = await response.json().catch(() => ({}))
//             return fail(response.status, { 
//                 username, 
//                 error: errResponse.message || 'Invalid username or password.' 
//             })
//         }
//         console.log("cheogu")
//     } catch (err) {
//         return fail(500, { username, error: 'Authentication service unavailable. Try again later.' })
//     } finally {
//         console.log("FOIEEEEE!")
//     }
// }

// export const actions: Actions = {login}