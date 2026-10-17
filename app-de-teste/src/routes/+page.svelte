
<script lang="ts">
	/* Versionamento: Major / Minor / Patch */

	import { goto } from '$app/navigation';
	import { Role } from '../role-enum.ts';

	let username: string = $state('');
	let password: string = $state('');
	let accountType: Role = $state(Role.TEAM);

	let errorMessage = $state('');

	async function handleLogin(e: SubmitEvent) {
		e.preventDefault();
		errorMessage = '';

		try {
			const response = await fetch('http://localhost:3000/auth/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password, accountType })
			});

			if (!response.ok) { return }

			await goto('/editor');
		} catch {
			errorMessage = 'Nome de usuário ou senha inválidos';
		}
	}

	function enterAsVisitor() {
		errorMessage = '';
		void goto('/editor');
	}

	// Se eu fizer lazy loading eu podia colocar no texto de carregamento "o primeiro loading é o único que demora :)"
</script>

<svelte:head>
	<title>Login</title>
	<meta name="Página de login" content="Svelte demo app" />
</svelte:head>

<div class="login-panel">
	<form onsubmit={handleLogin} action="http://localhost:3000/auth/signin" class="form">
		{#if accountType === Role.ADMIN}
			<h3>Professor</h3>
			<label for="username">Nome</label>
			<input bind:value={username} type="text" required minlength="3" id="username" autocomplete="username">

		{:else if accountType === Role.TEAM}
			<h3>Time</h3>
			<label for="teamname">Time</label>
			<input bind:value={username} type="text" required minlength="3" id="teamname" autocomplete="username">
			
		{/if}
		
		<label for="password">Password</label>
		<input bind:value={password} type="password" required minlength="3" id="password" autocomplete="current-password">
		
		{#if errorMessage}
			<p class="error-message" role="alert">{errorMessage}</p>
		{/if}
		
		<div class="user-type">
			<button type="button" onclick={() => accountType = Role.TEAM}>
				Time
			</button>
			<button type="button" onclick={() => accountType = Role.ADMIN}>
				Professor
			</button>
		</div>

		<div class="login-buttons">
			<button type="submit">Login</button>
			<button type="button" onclick={enterAsVisitor}>Entrar como Visitante</button>
		</div>
	</form>
</div>

<style>
	input:user-valid {
		border-color: aqua;
		background-color: green;

	}
	.error-message {
		color: #b42318;
		margin: 0.5rem 0;
	}
	.login-panel {
		max-width: 275px;
		min-height: 400px;
		background-color: antiquewhite;
	}
	.login-buttons {
		display: flex;
		flex-direction: column;
	}
	.form {
		display: flex;
		flex-direction: column;
		
	}
	.user-type {
		display: flex;
		justify-content: space-evenly;
		button {
			height: 50px;
			width: 100%;
		}
	}
</style>
<!--
<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcomeFallback} alt="Welcome" />
			</picture>
		</span>
		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
-->