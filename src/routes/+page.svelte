<script lang="ts">
    import Note from "$lib/components/Note.svelte";
    import AddNoteForm from "$lib/components/AddNoteForm.svelte";
    import { flip } from "svelte/animate";
    export let data;
</script>

<svelte:head>
    <title>Notes</title>
</svelte:head>



    <div class="px-60 pt-20 h-fit max-h-none  min-h-screen overflow-auto bg-yellow-100">
        <div>
            <div class="flex">
                <div class="flex-1"></div>
                <div class="flex-none">
                    <AddNoteForm  />
                </div>
            </div>
        </div>
        <div class="flex w-full gap-5 flex-wrap mt-5 h-32">
            {#if data.notes.length < 1}
                <div class="grid place-items-center w-full">
                    <span class="alegreya-bold text text-3xl">No notes...</span>
                </div>
            {:else}
                {#each data.notes as note (note.id)}
                    <div class="flex-auto" animate:flip={{delay:200, duration: 200}}>
                        <Note {note} />
                    </div>
                {/each}
            {/if}
        </div>
    </div>




