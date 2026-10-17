<script lang="ts">
    import Editor from './Editor.svelte'

    import { SplitPane, Pane } from 'flowbite-svelte';
        




    // Eu quero guardar o código no localstorage E eu quero averiguar se o usuário esta 
// logado antes de puxar eles, eles só serão salvos pra usuários logados, por agora

</script>

<button onclick={() => console.log('salvou')}> salvar codigo </button>

<div class="semi-grid">
    <div class="task">
        <h4>questões</h4>
    </div>

    <div style="display: flex; flex-direction: column;">
        <div class="editor">
            <h4>editor</h4>
            <Editor></Editor>
        </div>
        <div class="terminal">
            <h4>terminal</h4>
        </div>
    </div>
</div>

<style>
    .semi-grid {
        display: flex;
    }
    .task {
        min-width: 350px;
        min-height: 350px;
        max-width: 350px;
        background-color: antiquewhite;
    }

    .editor {
        min-width: 350px;
        min-height: 350px;
        max-width: 350px;
        max-height: 350px;

        background-color: bisque;
    }
    .terminal {
        min-width: 350px;
        min-height: 350px;
        max-width: 350px;
        max-height: 350px;
        background-color: aquamarine;
    }
</style>