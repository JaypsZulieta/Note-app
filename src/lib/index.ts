import type { PrismaClient } from "@prisma/client";
import type { Note as Prismanote } from "@prisma/client";

class Note {

    private id: string;
    private title: string;
    private body: string;

    constructor(id: string, title: string, body: string){
        this.id = id;
        this.title = title;
        this.body = body;
    }

    public async setTitle(title: string, prismaClient: PrismaClient): Promise<void>{
        this.title = title;
        await prismaClient.note.update({ data: { title }, where: { id: this.id }});
    }

    public async setBody(body: string, prismaClient: PrismaClient): Promise<void> {
        this.body = body;
        await prismaClient.note.update({ data: { body }, where: { id: this.id }});
    }

    public async delete(prismaClient: PrismaClient): Promise<void>{
        await prismaClient.note.delete({ where: { id: this.id }});
    }

    public getId(): string {
        return this.id;
    }

    public getTitle(): string{
        return this.title;
    }
    
    public getBody(): string {
        return this.body;
    } 
}

export class NoteFinder {

    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async findAll(): Promise<Prismanote[]> {
        return await this.prismaClient.note.findMany({ orderBy: { timeAdded: 'desc' }});
    }

    public async findById(id: string): Promise<Note>{
        if(!this.existById(id)) throw Error(`note ${id} does not exist`);
        const note = await this.prismaClient.note.findUniqueOrThrow({ where: { id }});
        return new Note(note.id, note.title, note.body);
    }

    private async existById(id: string): Promise<boolean> {
        return await this.prismaClient.note.count({ where: { id }}) > 0;
    }
}

export class NoteWriter {
    
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async writeNote(title: string, body: string): Promise<Note>{
        const note = await this.prismaClient.note.create({ data: { body, title }});
        return new Note(note.id, note.title, note.body);
    };
}