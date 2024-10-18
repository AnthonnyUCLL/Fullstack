import { Message } from "../model/message";
import {Message as MessagePrisma} from '@prisma/client'
import database from "../../util/database";

const getAllMessages = async (): Promise<Message[]> => {
    try {
        const messagePrisma = await database.message.findMany({
            include: {
                chat: true,
                person: {
                    include: {
                        chats: true 
                    }
                }
            }
        })
    
        return messagePrisma.map((messagePrisma) => Message.from(messagePrisma));
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}

const getMessageById = async (id:number): Promise<Message> => {
    try {
        const messagePrisma = await database.message.findUnique({
            where: {
                id: id
            },
            include: {
                chat: true,
                person: {
                    include: {
                        chats: true 
                    }
                }
            }
        })

        return messagePrisma ? Message.from(messagePrisma) : null
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}

const addMessage = async (text:string, chatId:number, personId:number): Promise<Message> => { 

    try {
        const messagePrisma = await database.message.create({
            data: {
                text: text,
                chat:{
                    connect: {id: chatId}
                },
                person:{
                    connect: {id: personId}
                }
            },
            include: {
                chat: true,
                person: {
                    include: {
                        chats: true 
                    }
                }
            }
          });
    
        return messagePrisma ? Message.from(messagePrisma) : null;
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}

const getAllMessagesByChatId = async (chatId:number): Promise<Message[]> => {
    try {
        const messagePrisma = await database.message.findMany({
            where: {
                chatId: chatId
            },
            include: {
                chat: true,
                person: true
            }
        })

        return messagePrisma ? messagePrisma.map((messagePrisma) => Message.from(messagePrisma)) : null
        
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}

const getAllMessagesByPersonId = async (personId:number): Promise<Message[]> => {
    try {
        const messagePrisma = await database.message.findMany({
            where: {
                personId: personId
            },
            include: {
                chat: true,
                person: true
            }
        })

        return messagePrisma ? messagePrisma.map((messagePrisma) => Message.from(messagePrisma)) : null
        
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}

const deleteMessageById = async (id: number): Promise<Message> => {
    try {
        const messagePrisma = await database.message.delete({
            where: {
                id: id
            },
            include: {
                chat: true,
                person: true
            }
        })

        return messagePrisma ? Message.from(messagePrisma) : null
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}

export default {getAllMessages, getMessageById, addMessage, getAllMessagesByChatId, getAllMessagesByPersonId, deleteMessageById}