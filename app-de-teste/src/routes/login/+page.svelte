<!-- src/routes/login/+page.svelte -->
<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    let { form }: { form: ActionData } = $props();
    let loading = $state(false);
</script>

<div class="auth-card">
    <form 
        method="POST"
        use:enhance
        action="?/login"
    >
        {#if form?.error}
            <div class="alert-error" role="alert">
                {form.error}
            </div>
        {/if}

        <div class="">
            <label for="username">Username</label>
            <input 
                type="username" 
                id="username" 
                name="username" 
                value={form?.username ?? ''} 
                required 
            />
        </div>

        <div class="">
            <label for="password">Password</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                required 
            />
        </div>

        <button type="submit">
            Login
        </button>
    </form>
</div>