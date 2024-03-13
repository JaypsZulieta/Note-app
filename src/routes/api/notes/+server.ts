import type { RequestEvent } from "./$types";
import { NoteFinder } from "$lib/index";
import { PrismaClient } from "@prisma/client";
import { json } from "@sveltejs/kit";

const prismaClient = new PrismaClient();
const noteFinder = new NoteFinder(prismaClient);

export const PUT = async (event: RequestEvent) => {
    const id = event.url.searchParams.get('id') as string;
    const formData = await event.request.formData();
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;
    const note = await noteFinder.findById(id);
    await note.setBody(body,prismaClient);
    await note.setTitle(title, prismaClient);
    return json({ message: 'success'});
}