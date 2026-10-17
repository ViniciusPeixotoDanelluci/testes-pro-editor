<script lang="ts">
	import './../../layout.css';

	let { children } = $props();
</script>

<div class="admin-app">
    <header>
        <h1>Admin área</h1>
        <h5>BOM DIA</h5>

        <a href="admin/alunos">Alunos</a>
        <a href="admin/eventos">Eventos</a>
        <a href="admin/tarefas">Tarefas</a>
        <a href="admin/times">Times</a>
    </header>

    <main>
		{@render children()}
	</main>
</div>


<style>
    header {
        box-sizing: border-box;
        width: clamp(48px, 220px, 220px);
        padding: 5px 0;
        position: sticky;
        background-color: #97aee7;
        overflow: hidden;
        
        display: flex;
        flex-direction: column;
    }

    .admin-app {
        display: flex;
        justify-content: center;
    }
</style>