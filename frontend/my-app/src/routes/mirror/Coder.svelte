<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { githubDark } from '@fsegurai/codemirror-theme-github-dark';
	import { csharp } from '@replit/codemirror-lang-csharp';
 	import { onMount } from 'svelte';
 	import { browser } from '$app/env';

	let { value = $bindable('') } = $props();

	let dataTheme = $state(browser ? document.documentElement.dataset.theme : 'light');

	onMount(() => {
		if (!browser) return;

		const observer = new MutationObserver(() => {
			dataTheme = document.documentElement.dataset.theme;
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});
		return () => observer.disconnect();
	});

	let codeTheme = githubDark;

</script>

<CodeMirror bind:value lang={csharp()} theme={codeTheme} class="w-full" />
