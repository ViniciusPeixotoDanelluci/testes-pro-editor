<script lang="ts">
    let dialog: HTMLDialogElement

    let schedule_value: string = $state('')!
    let date_value: string = $state('')!
    let duration_value: string = $state('')!

    async function createEvent(schedule: string, duration: string, date: string) {
        console.log({ schedule, duration, date })
        try {
            const response = await fetch('http://localhost:3000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ schedule, duration, date })
            })

            if (!response.ok) {
                throw new Error(`Event creation failed: ${response.status}`)
            }
            dialog.close()
        } catch (error) {
            console.error('Could not create event:', error)
        }
    }
</script>

<aside>
    <div>Eventinhos</div>
</aside>

<button onclick={() => dialog.showModal()}> Criar evento </button>

<dialog bind:this={dialog}>
    <form action="/?create-event">
        <div>
            <label for="schedule">Horário de início: </label>
            <input type="time" name="schedule" id="schedule" bind:value={schedule_value}>
        </div>
        <div>
            <label for="duration">Duração (minutos): </label>
            <input type="number" name="duration" id="duration" bind:value={duration_value}>
        </div>
        <div>
            <label for="calendar">Data: </label>
            <input type="date" name="calendar" id="calendar" bind:value={date_value}>
            <!-- isso aqui tem que ter alguma checagem pra que não seja possível criar um evento no passado -->
        </div>
        <button onclick={() => createEvent(schedule_value, duration_value, date_value)}>Finalizar criação</button>
    </form>
</dialog>

