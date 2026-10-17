<script lang="ts">
    import { onMount } from 'svelte';
	import CodeMirror from 'svelte-codemirror-editor';
	import { githubDark } from '@fsegurai/codemirror-theme-github-dark';
	import { csharp } from '@replit/codemirror-lang-csharp';

	let code: string = $state('')

	async function awaitStoredCode() {

		const storedCode = new Promise<string>((resolve) => {
			resolve(localStorage.getItem('code'))
		})

		const result = await storedCode

		console.log("resultado",result)
		code = result
	}
	
	function updateCode(code: string) {
        console.log("Código:", code)

		// if (typeof window !== 'undefined') {
		localStorage.setItem('code', code)
		console.log("Código logado")
		// }
	}

</script>

<CodeMirror 
	bind:value={code} 
	onchange={updateCode} 
	onready={awaitStoredCode}
	lang={csharp()} 
	theme={githubDark} 
	class="" 
/>


<!--

	let code: string = $state('')
	let loaded = $state(false)

	function updateCode(value: string) {
		localStorage.setItem('code', value)
	}
	onMount(() => {
		code = localStorage.getItem('code') ?? ''
		loaded = true
	})
</script>

{#if loaded}
	<CodeMirror
		bind:value={code}
		onchange={updateCode}
		lang={csharp()}
		theme={githubDark}
		class=""
	/>
{/if}

-->