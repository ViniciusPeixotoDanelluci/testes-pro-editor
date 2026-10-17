<script lang="ts">
    import type { PageProps } from './$types'
    import Papa from 'papaparse'
    import { Semesters } from '../../../../semester-enum';
    
    interface Students {
        name: string, 
        semester: Semesters
    }[]

    const inCaseThresNoStudents = { students: [{name: "Rollback", semester: Semesters['1° Termo']}]}

    let { data = inCaseThresNoStudents }: PageProps = $props() 

    let csv: HTMLInputElement | undefined = $state()
    let students_data: Students[] | undefined = $state()


    function parsear() {
        const file: File | null | undefined = csv?.files?.[0]

        if (!file) throw new Error("não tem nenhum arquivo")

        Papa.parse<Students>(file, {
            header: true,
            dynamicTyping: true, 
            delimiter: ',',
            skipEmptyLines: true,
            // error: function(err, file, inputElem, reason) {
            //   throw new Error('Error: ' + err + ' : ' + reason + '<br>');
            //   return false;
            // },
            complete: (parsed) => {
                console.log("dados", parsed)
                students_data = parsed.data
                // Ao invés de igual eu tenho que appender o resultado ao array atual e salvalo no banco
            }
        })
    }

</script>

{#each students_data as s}
    <div>{s.name} do {s.semester}</div>
{/each}

<!--eu podia criar um desafio que fosse uma especie de CSV parser, se possível-->
<label for="drop-csv" class="">CSV</label>

<input 
    type="file"
    name="drop-csv"
    id="drop-csv"
    accept=".csv" 
    bind:this={csv}
>
<button onclick={() => parsear()}>ver o csv</button>

<!--

<script lang="ts">
    import { Semesters } from '../../../semester-enum';
    import Papa from 'papaparse'
    import type { PageProps } from './$types'

    const inCaseThresNoStudents = { students: [{name: "Rollback", semester: Semesters['1° Termo']}]}

    let { data = inCaseThresNoStudents }: PageProps = $props() 

    type Student = { name: string; semester: Semesters }

    let csvInput: HTMLInputElement
    let importedStudents = $state<Student[]>([])
    let csvMessage = $state('')

    async function parsear() {
        const file = csvInput.files?.[0]
        if (!file) {
            csvMessage = 'Selecione um arquivo CSV.'
            return
        }

        const csvText = await file.text()
        const { data: rows, errors } = Papa.parse<Record<string, string>>(csvText, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim().toLowerCase()
        })

        if (errors.length > 0) {
            csvMessage = `Erro ao ler o CSV: ${errors[0].message}`
            return
        }

        const semesterValues: Record<string, Semesters> = {
            '1° termo': Semesters['1° Termo'],
            '2° termo': Semesters['2° Termo'],
            '3° termo': Semesters['3° Termo'],
            '4° termo': Semesters['4° Termo']
        }

        const parsedStudents: Student[] = []
        for (const row of rows) {
            const name = row.name?.trim()
            const semester = semesterValues[row.semester?.trim().toLowerCase() ?? '']
            if (name && semester !== undefined) {
                parsedStudents.push({ name, semester })
            }
        }

        importedStudents = parsedStudents
        csvMessage = parsedStudents.length > 0
            ? `Importados ${parsedStudents.length} alunos.`
            : 'Nenhum aluno válido foi encontrado. O CSV precisa ter as colunas name e semester.'
    }
</script>


{#each data.students as s}
    <div>{s.name} do {s.semester}</div>
{/each}
{#each importedStudents as s}
    <div>{s.name} do {s.semester}</div>
{/each}
<label for="drop-csv" class="">CSV</label>
<input type="file" name="drop-csv" id="drop-csv" accept=".csv" bind:this={csvInput}>

<button onclick={parsear}>ver o csv</button>
{#if csvMessage}
    <p>{csvMessage}</p>
{/if}
-->