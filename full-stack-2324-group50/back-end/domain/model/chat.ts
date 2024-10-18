import { Person } from "./person";
import {Chat as ChatPrisma} from '@prisma/client'
export class Chat {
    
    readonly id: number;

    constructor(chat:{id: number}) {
        this.validate(chat)
        this.id = chat.id;
    }
    
    validate(chat: { id: number}) {
        if (chat.id !== null) {
            if (chat.id < 0) {
                throw new Error('Id cannot be negative')
            }
        }
    }

    static from({
        id,
    }: ChatPrisma) {    
        return new Chat({
            id,
        })
    }
}