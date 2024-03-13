<script lang="ts">
    import { enhance } from "$app/forms";


    let modal: HTMLDialogElement;

    const showModal = () => {
        modal.showModal();
    }

</script>


<button class=" btn btn-accent btn-square rounded-full shadow-md" on:click={showModal}>
    <span class="material-symbols-outlined">add</span>
</button>
<dialog bind:this={modal}  class="modal">
    <form class="p-10 py-5  w-2/3 rounded-md bg-yellow-50" method="POST" action="?/write" use:enhance={() => {modal.close()}}>
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
        <input class="input input-ghost w-full text-3xl alegreya-bold rounded-none" placeholder="Write your title here" name="title" required>
        <span class="text alegreya-regular text-lg opacity-65 mx-4">{new Date()}</span>
        <textarea class="text text-lg alegreya-regular textarea textarea-ghost w-full opacity-95 mt-5 text-justify h-40 rounded-none resize-none bg-yellow-50" placeholder="Write the body of your note here..." name="body" required />
        <div class="flex mt-2">
            <div class="flex-1"></div>
            <button type="submit" class="btn alegreya-regular flex-none btn-sm btn-primary rounded-none w-32" >
                SAVE
                <span class="material-symbols-outlined">save</span>
            </button>
        </div>
    </form>
</dialog>