
export async function load(
    { fetch }: 
    { fetch: typeof globalThis.fetch }
) {
    const res = await fetch('/api/contest-status');
    const { marathon } = await res.json();
    
    console.log("maratona", marathon)

    return { marathon };
}
// Ai aqui eu também dou fetch no horário que falta pra começar o evento se o usuário fez login como time
// ai eu crio um timeout usando esse tempo como base e jogo um erro se esse timeout não for achado, pra debug purpouses
