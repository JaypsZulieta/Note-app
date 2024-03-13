<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Note } from "@prisma/client";
    import { invalidateAll } from "$app/navigation";

    export let note: Note;
    const { id, body, timeAdded, title} = note;

    let modal: HTMLDialogElement;

    const showModal = () => {
        modal.showModal();
    }

    const submit = async (e: Event) => {
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        await fetch(`/api/notes?id=${id}`, { method: 'PUT', body: formData }).then(() => {
            invalidateAll();
            modal.close();
        });
    }

</script>

<button class=" btn btn-ghost btn-square rounded-full btn-sm" on:click={showModal}>
    <span class="material-symbols-outlined">settings</span>
</button>
<dialog bind:this={modal}  class="modal">
    <form class="p-10 py-5  w-2/3 rounded-md bg-yellow-50" on:submit|preventDefault={submit}>
        <div class="flex">
            <div class="flex-1"></div>
            <div class="flex-none">
                <form method="dialog">
                    <button class="btn btn-ghost btn-square rounded-full hover:bg-error hover:text-error-content">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </form>
            </div>
        </div>
        <input class="input input-ghost w-full text-3xl alegreya-bold rounded-none" placeholder="Write your title here" name="title" value={title} required>
        <span class="text alegreya-regular text-lg opacity-65 mx-4">{timeAdded}</span>
        <textarea class="text text-lg alegreya-regular textarea textarea-ghost w-full opacity-95 mt-5 text-justify h-40 rounded-none resize-none bg-yellow-50" placeholder="Write the body of your note here..." name="body" value={body} required />
        <div class="flex mt-2 gap-2">
            <div class="flex-1"></div>
            <button type="submit" class="btn alegreya-bold flex-none btn-sm btn-primary rounded-none w-32" >
                SAVE
                <span class="material-symbols-outlined">save</span>
            </button>
            <form method="POST" action="?/delete" use:enhance={() => { modal.close() }}>
                <button type="submit" class="btn alegreya-bold flex-none btn-sm btn-error rounded-none w-32" name="id" value={id} >
                    DELETE
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </form>
        </div>
    </form>
</dialog>