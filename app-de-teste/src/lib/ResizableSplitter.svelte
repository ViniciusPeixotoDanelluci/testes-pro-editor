<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		left,
		right,
		initialSize = 50,
		minSize = 20,
		maxSize = 80
	}: {
			left: Snippet;
			right: Snippet;
			initialSize?: number;
			minSize?: number;
			maxSize?: number;
		} = $props();

	let container: HTMLDivElement;
	let split = $state(50);

	$effect(() => {
		split = initialSize;
	});

	function resize(event: PointerEvent) {
		const bounds = container.getBoundingClientRect();
		const nextSize = ((event.clientX - bounds.left) / bounds.width) * 100;
		split = Math.max(minSize, Math.min(maxSize, nextSize));
	}

	function startResize(event: PointerEvent) {
		event.preventDefault();
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		resize(event);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') {
			split = Math.max(minSize, split - 2);
		} else if (event.key === 'ArrowRight') {
			split = Math.min(maxSize, split + 2);
		} else if (event.key === 'Home') {
			split = minSize;
		} else if (event.key === 'End') {
			split = maxSize;
		} else {
			return;
		}

		event.preventDefault();
	}
</script>

<div class="splitter" bind:this={container} style={`--split: ${split}%`}>
	<section class="pane pane-left">
		{@render left()}
	</section>

	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="splitter-grip"
		role="separator"
		aria-label="Resize panels"
		aria-orientation="vertical"
		aria-valuemin={minSize}
		aria-valuemax={maxSize}
		aria-valuenow={Math.round(split)}
		tabindex="0"
		onpointerdown={startResize}
		onpointermove={(event) => event.buttons === 1 && resize(event)}
		onkeydown={handleKeydown}
	>
		<span></span>
		<span></span>
		<span></span>
	</div>

	<section class="pane pane-right">
		{@render right()}
	</section>
</div>

<style>
	.splitter {
		display: flex;
		width: 100%;
		min-width: 0;
		min-height: 320px;
		height: min(65vh, 560px);
		overflow: hidden;
		border: 1px solid #d5dce6;
		border-radius: 12px;
		background: #fff;
		box-shadow: 0 12px 30px rgb(30 50 80 / 8%);
	}

	.pane {
		box-sizing: border-box;
		min-width: 0;
		padding: 1.25rem;
		overflow: auto;
	}

	.pane-left {
		width: calc(var(--split, 50%) - 5px);
		flex: 0 0 auto;
	}

	.pane-right {
		flex: 1 1 0;
	}

	.splitter-grip {
		z-index: 1;
		box-sizing: border-box;
		width: 10px;
		flex: 0 0 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2px;
		flex-direction: column;
		border-inline: 1px solid #e4e8ef;
		background: #f5f7fa;
		cursor: col-resize;
		touch-action: none;
		user-select: none;
	}

	.splitter-grip:hover,
	.splitter-grip:focus-visible {
		background: #e8eef8;
		outline: none;
	}

	.splitter-grip span {
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: #8492a6;
	}

	@media (max-width: 600px) {
		.pane {
			padding: 0.85rem;
		}
	}
</style>
