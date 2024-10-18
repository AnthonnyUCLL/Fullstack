import { Message as MessagePrisma } from '@prisma/client'
import { Chat as ChatPrisma } from '@prisma/client'
import { Person as PersonPrisma } from '@prisma/client'
import { Chat } from './chat';
import { Person } from './person';
export class Message {
    
    readonly id: number;
    readonly time: Date;
    readonly text: string;
    readonly chat: Chat;
    readonly person: Person;

    constructor(message:{id: number, time:Date, text:string, chat: Chat, person: Person}) {
        this.validate(message)
        this.id = message.id;
        this.time = message.time;
        this.text = message.text;
        this.chat = message.chat;
        this.person = message.person;
    }

    validate(message: {id: number, time:Date, text:string, chat: Chat, person: Person}) {
        if (message.id !== null) {
            if (message.id < 0) {
                throw new Error('Id cannot be negative')
            }
        }

        if (!message.text?.trim()) {
            throw new Error("Message cannot be empty.")
        }
    }

    static from({
        id,
        time,
        text,
        chat,
        person
    }: MessagePrisma & {chat: ChatPrisma, person: PersonPrisma}) {
        return new Message({
            id,
            time,
            text,
            chat: Chat.from(chat),
            person: Person.from(person)
        })
    }
}