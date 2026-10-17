<script lang="ts">
	import { onMount } from 'svelte';

	type Role = 'admin' | 'student';
	type User = { id: number; name: string; role: Role };
	type AccessResult =
		| { allowed: true; message: string; members: User[] }
		| { allowed: false; message: string; members: [] };

	const team: User[] = [
		{ id: 1, name: 'Ana Silva', role: 'student' },
		{ id: 2, name: 'Bruno Costa', role: 'student' },
		{ id: 3, name: 'Clara Souza', role: 'student' }
	];
	const admin: User = { id: 4, name: 'Morgan Admin', role: 'admin' };
	const guest = null;

	let currentUser = $state<User | null>(team[0]);
	let result = $state<AccessResult | null>(null);
	let loading = $state(false);

	async function mockFetchTeam(user: User | null): Promise<AccessResult> {
		// Simulates a request; a real app must enforce this policy on its server too.
		await new Promise((resolve) => setTimeout(resolve, 250));

		if (!user || (user.role !== 'admin' && user.role !== 'student')) {
			return { allowed: false, message: 'Access denied. Please register or sign in.', members: [] };
		}

		return {
			allowed: true,
			message: user.role === 'admin' ? 'Admin access granted.' : 'Team member access granted.',
			members: team
		};
	}

	async function fetchAs(user: User | null) {
		currentUser = user;
		loading = true;
		result = null;
		result = await mockFetchTeam(user);
		loading = false;
	}

	onMount(() => {
		void fetchAs(currentUser);
	});
</script>

<svelte:head>
	<title>Role-based team access demo</title>
	<meta name="description" content="A small mock demo of role-based access to a student team." />
</svelte:head>

<main>
	<section class="demo-card" aria-labelledby="page-title">
		<div class="eyebrow">MOCK API DEMO</div>
		<h1 id="page-title">Role-based team access</h1>
		<p class="intro">Choose a user to simulate fetching the team endpoint.</p>

		<div class="user-picker" role="group" aria-label="Choose a mock user">
			<button class:active={currentUser?.role === 'student'} onclick={() => fetchAs(team[0])}>
				Student
			</button>
			<button class:active={currentUser?.role === 'admin'} onclick={() => fetchAs(admin)}>
				Admin
			</button>
			<button class:active={currentUser === null} onclick={() => fetchAs(guest)}>
				Unregistered
			</button>
		</div>

		<div class="request" aria-live="polite">
			<div class="request-heading">
				<div>
					<span class="label">CURRENT USER</span>
					<strong>{currentUser?.name ?? 'Not registered'}</strong>
				</div>
				<span class="role-badge">{currentUser?.role ?? 'guest'}</span>
			</div>

			<div class="endpoint"><span class="method">GET</span> /api/team</div>

			{#if loading || !result}
				<p class="status loading">Fetching mock data…</p>
			{:else if result.allowed}
				<p class="status success"><span aria-hidden="true">✓</span> {result.message}</p>
				<h2>Team members <span>{result.members.length}</span></h2>
				<ul class="member-list">
					{#each result.members as member (member.id)}
						<li>
							<span class="avatar">{member.name[0]}</span>
							<span class="member-name">{member.name}</span>
							<span class="member-role">{member.role}</span>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="status denied"><span aria-hidden="true">×</span> {result.message}</p>
				<p class="denied-detail">
					The mock endpoint only returns team data to registered students and admins.
				</p>
			{/if}
		</div>
		<p class="note">Demo only: role checks in a real app must happen on the server.</p>
	</section>
</main>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		background: #f3f6fb;
		color: #19253a;
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
	}

	main {
		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 32px 18px;
	}

	.demo-card {
		width: min(100%, 540px);
		padding: 36px;
		border: 1px solid #e5eaf2;
		border-radius: 20px;
		background: #fff;
		box-shadow: 0 20px 60px rgb(39 57 88 / 9%);
	}

	.eyebrow,
	.label {
		color: #71809a;
		font-size: 0.72rem;
		font-weight: 750;
		letter-spacing: 0.09em;
	}

	h1 {
		margin: 10px 0 8px;
		font-size: clamp(1.65rem, 5vw, 2rem);
		letter-spacing: -0.04em;
	}

	.intro {
		margin: 0;
		color: #65738b;
	}

	.user-picker {
		display: flex;
		gap: 8px;
		margin: 26px 0 20px;
		padding: 5px;
		border-radius: 12px;
		background: #f3f6fa;
	}

	button {
		flex: 1;
		min-height: 40px;
		border: 0;
		border-radius: 9px;
		background: transparent;
		color: #65738b;
		font: inherit;
		font-size: 0.88rem;
		font-weight: 650;
		cursor: pointer;
	}

	button:hover {
		color: #22324c;
	}

	button.active {
		background: #fff;
		color: #294fc4;
		box-shadow: 0 2px 7px rgb(39 57 88 / 12%);
	}

	button:focus-visible {
		outline: 3px solid #9eb7ff;
		outline-offset: 2px;
	}

	.request {
		padding: 20px;
		border: 1px solid #e8edf4;
		border-radius: 14px;
	}

	.request-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.request-heading > div {
		display: grid;
		gap: 5px;
	}

	.request-heading strong {
		font-size: 0.98rem;
	}

	.role-badge,
	.member-role {
		padding: 5px 9px;
		border-radius: 999px;
		background: #eef2ff;
		color: #465db0;
		font-size: 0.75rem;
		font-weight: 650;
	}

	.endpoint {
		margin: 18px 0;
		padding: 11px 12px;
		border-radius: 8px;
		background: #f6f8fb;
		color: #45536b;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.84rem;
	}

	.method {
		margin-right: 8px;
		color: #16825d;
		font-weight: 800;
	}

	.status {
		margin: 0 0 17px;
		font-size: 0.9rem;
		font-weight: 650;
	}

	.success {
		color: #16825d;
	}

	.denied {
		color: #bd3c46;
	}

	.loading,
	.denied-detail {
		color: #65738b;
	}

	.denied-detail {
		margin: 0;
		font-size: 0.88rem;
		line-height: 1.5;
	}

	h2 {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 0 0 10px;
		font-size: 0.9rem;
	}

	h2 span {
		color: #71809a;
		font-size: 0.78rem;
	}

	.member-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.member-list li {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 0;
		border-top: 1px solid #edf0f5;
	}

	.avatar {
		display: grid;
		width: 34px;
		height: 34px;
		place-items: center;
		border-radius: 50%;
		background: #edf2ff;
		color: #465db0;
		font-size: 0.85rem;
		font-weight: 750;
	}

	.member-name {
		flex: 1;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.member-role {
		background: #f1f4f8;
		color: #71809a;
		font-size: 0.7rem;
	}

	.note {
		margin: 16px 0 0;
		color: #8793a7;
		font-size: 0.76rem;
		line-height: 1.45;
	}

	@media (max-width: 480px) {
		.demo-card {
			padding: 24px 18px;
		}

		.request {
			padding: 16px;
		}
	}
</style>
