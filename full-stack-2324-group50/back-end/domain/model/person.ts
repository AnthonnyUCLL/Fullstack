import { Person as PersonPrisma } from '@prisma/client'
import { Chat as ChatPrisma } from '@prisma/client'
import { Chat } from './chat';

export class Person {

    readonly id: number;
    readonly username: string;
    readonly age: number;
    readonly nationality: string;
    readonly userId: number;
    chats: Chat[];

    constructor(person: { id: number, username: string, age: number, nationality: string, userId: number, chats?: Chat[]}) {
        this.validate(person)
        this.id = person.id;
        this.username = person.username;
        this.age = person.age;
        this.nationality = person.nationality;
        this.userId = person.userId;
        this.chats = person.chats ? person.chats : []
    }

    validate(person: { id: number, username: string, age: number, nationality: string, userId: number }) {
        if (person.id !== null) {
            if (person.id < 0) {
                throw new Error('Id cannot be negative')
            }
        }

        const regexBevatGetal = new RegExp('\\d');

        if (person.username !== null) {
            if (regexBevatGetal.test(person.username)) {
                throw new Error("Username cannot contain numbers.")
            }
        }

        if (person.age !== null) {
            if (person.age <= 0 || person.age > 100) {
                throw new Error('Your age cannot be more than 100 or less than 0.')
            }
        }

        if (person.nationality !== null) {
            if (regexBevatGetal.test(person.nationality)) {
                throw new Error("Nationality cannot contain numbers.")
            }
        }

        if (person.userId !== null) {
            if (person.userId < 0) {
                throw new Error('userId cannot be negative')
            }
        }
    }

    static from({
        id,
        username,
        age,
        nationality,
        userId,
        chats
    }: PersonPrisma & {chats?: ChatPrisma[]}) {
        return new Person({
            id,
            username,
            age,
            nationality,
            userId,
            chats: chats ? chats.map((chat) => Chat.from(chat)) : []
        })
    }
}