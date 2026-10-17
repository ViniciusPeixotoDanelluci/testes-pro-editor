<script lang="ts">

	import Coder from './Coder.svelte';

		let value = $state(`
	public class Solution {
	public bool Main(int x) {
		// Substitua esse placeholder pelo seu próprio código.
		return true;
	}
	}`)
	/*
	public class Solution {
	public bool Main(int x) {
		var num = x.ToString();
		var l = num.Length;
		int c = l / 2;

		for (int i = 0; i < c; i++) {
		if (num[i] != num[l - 1 - i])
			return false;
		}

		return true;
	}
	}
	*/

	let navConsole = $state(false)
	let compilerResult = $state(null)
	let isRunningCode = $state(false)

	// @ts-ignore
	let compilerCases = $derived((data.data.cases ?? []).map((testCase) => testCase.inputs?.[0]));

	let { data } = $props()

	let casesAndParamData = $derived({
		cases: data.data.cases,
		param: data.data.param
	})

	// async function runCode() {
	// 	isRunningCode = true;
	// 	navConsole = true;
	// 	try {
	// 		const response = await fetch(COMPILER_ENDPOINT, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				code: value,
	// 				cases: compilerCases
	// 			})
	// 		})
	// 		console.log(response)
	// 		if (!response.ok) {
	// 			const error = await response.text()
	// 			throw new Error(`Compiler request failed: ${response.status} ${error}`)
	// 		}

	// 		const result = await response.json()
	// 		compilerResult = result
	// 		console.log('resultado', result)
	// 		console.log('resultado compilado:', compilerResult)
	// 	} catch (error) {
	// 		//@ts-ignore
	// 		compilerResult = {
	// 			error: error instanceof Error ? error.message : 'Unknown compiler error'
	// 		}
	// 	} finally {
	// 		isRunningCode = false
	// 	}
	// }
	const descriptionTextContent: string = "Descrição da questão, cada exemplo corresponde ao respectivo caso de teste.\
					Input sendo o valor que a função principal do seu código vai receber, e Output sendo o valor que o algoritmo deve \
					retornar por via de um 'return valor'."
	const codigoTextContent: string = "Editor de código, escreva aqui o seu algoritmo para responder a questão, você pode usar o botão \
					'Executar' para testar o seu código, e enviá-lo pressionando 'Enviar'.\
					Você pode trocar entre 4 linguagens disponíveis e printar mensagens no console caso precise. Boa sorte!"
	const debuggerTextContent: string = "Painel de debugging, você pode visualizar cada caso de teste e o seu parâmetro\
					correspondente de forma individual clicando nos botões de caso. A ferramenta de console fica ativa assim \
					que você executar o seu código"

</script>

<div class="editor-container">
	<section class="task-panel h-full">
		<div class="tabset tabset-padded">
			<h4 class="tab-title">Descrição</h4>
		</div>
		<div class="task-description">

		</div>
	</section>
	<section class="workspace flex-col justify-between h-full w-full">
		<div class="flex-col h-full w-full">
			<div class="tabset justify-between">
				<div class="tabset tabset-padded">
					<h4 class="tab-title">Código</h4>
				</div>
				<div class="util-tab flex-row">
				
				</div>
			</div>
			<div class="code-mirror flex-row h-full" >
				<Coder bind:value />
			</div>
		</div>

		<div class="debugger flex-col h-60 w-full">
			<div class="tabset">
				<button class="debugger-tab-btn" onclick={() => (navConsole = false)}>
					Casos de teste
				</button>
				<div class="header-divider"></div>
				<button onclick={() => (navConsole = true)}>
					Console
				</button>
			</div>
		</div>
	</section>
</div>
<style>
	.editor-container {
		background-color: var(--bg-editor-root);
		color: var(--txt-editor);
	}

	.editor-container button {
		display: flex;
		text-align: center;
		align-items: center;
		padding: 0.25rem 0.75rem;
		gap: 10px;
		background-color: transparent;
		border: none;
		color: var(--txt-editor);
	}

	.editor-container button:hover {
		border-radius: 1rem;
		background-color: var(--bg-editor-hover);
	}

	.editor-container {
		display: flex;
		height: 100vh;
		padding: var(--space-2);
		gap: var(--space-2);
	}

	.task-panel {
		width: 65%;
		height: 100%;
		max-height: 100vh;
		border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
		background-color: var(--bg-editor-panel);
	}

	.tabset {
		display: flex;
		align-items: center;
		min-height: 2.5rem;
		padding-inline: 0.6rem;
		gap: 0.5rem;
		background-color: var(--bg-editor-tab);
		border-radius: 0.5rem 0.5rem 0 0;
		border-bottom: 0px solid transparent;
	}

	.tabset-padded {
		padding: 0.25rem 0.75rem;
	}

	.tab-title {
		margin-top: 0;
		background-color: var(--bg-editor-tab);
	}

	.util-tab {
		margin-right: 0.5rem;
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: transparent;
	}


	.header-divider {
		height: 1.5rem;
		width: 1px;
		background-color: var(--border-editor-divider);
	}

	.workspace {
		gap: var(--space-2);
	}

	.code-mirror {
		border-radius: 0 0 0.5rem 0.5rem;
		min-height: 0;
		background-color: var(--bg-editor-code);
		overflow: hidden;
		flex: 1;
		width: 100%;
	}

	.debugger {
		height: 100%;
		max-height: 28rem;
		overflow: hidden;
	}
</style>
