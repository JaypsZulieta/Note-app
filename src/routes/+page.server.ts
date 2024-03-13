import { NoteFinder, NoteWriter } from "$lib";
import { PrismaClient } from "@prisma/client";
import type { Actions, PageServerLoad } from "./$types";

const prismaClient = new PrismaClient();
const noteFinder = new NoteFinder(prismaClient);
const noteWriter = new NoteWriter(prismaClient);

export const load = (async () => {
    const notes = await noteFinder.findAll();
    return { notes };
}) as PageServerLoad;

export const actions = ({
    write: async (event) => {
        const formData = await event.request.formData();
        const title = formData.get('title') as string;
        const body = formData.get('body') as string;
        await noteWriter.writeNote(title, body);
    },
    update: async (event) => {
        const formData = await event.request.formData();
        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const body = formData.get('body') as string;
        const note = await noteFinder.findById(id);
        await note.setTitle(title, prismaClient);
        await note.setBody(body, prismaClient);
    },
    delete: async (event) => {
        const formData = await event.request.formData();
        const id = formData.get('id') as string;
        const note = await noteFinder.findById(id);
        await note.delete(prismaClient);
    }
}) satisfies Actions;