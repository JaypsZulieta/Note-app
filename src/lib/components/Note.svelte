<script lang="ts">
    import type { Note } from "@prisma/client";
    import { fade } from "svelte/transition";
    import NoteSettings from "./NoteSettings.svelte";

    export let note: Note;
</script>



<div class="shadow-md p-10 w-full rounded-md max-h-96 overflow-auto  bg-yellow-50" in:fade={{delay: 200, duration: 20}}  out:fade={{duration: 200}}>
    <div class="flex gap-2">
        <div class="flex-1 h-0"></div>
        <div class="flex-none">
            <NoteSettings {note} />
        </div>
    </div>
    <h1 class="text text-3xl font-bold alegreya-bold">{note.title}</h1>
    <span class="text opacity-65 alegreya-regular text-lg">{note.timeAdded}</span>
    <p class="mt-5 text text-lg alegreya-regular text-justify opacity-95">{note.body}</p>
</div>