import { ChatInput } from "../../types";
import { Chat } from "../model/chat";
import { PrismaClient, Prisma } from "@prisma/client";
import {Chat as ChatPrisma} from '@prisma/client'
import database from "../../util/database";

const prisma = new PrismaClient();

const getAllChats = async (): Promise<Chat[]> => {
    try {
        const chatsPrisma = await database.chat.findMany({
        })
    
        return chatsPrisma.map((chatsPrisma) => Chat.from(chatsPrisma));
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}

const getChatById = async (id:number): Promise<Chat> => {
    try {
        const chatPrisma = await database.chat.findUnique({
            where: {
                id: id
            },
        })
        return chatPrisma ? Chat.from(chatPrisma) : null

    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details. ID');
    }
}

const addChat = async (): Promise<ChatPrisma> => {
    try {
        const new_chat = await prisma.chat.create({
          });
        
        return new_chat;
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.'); 
    }
}

export default {getAllChats, getChatById, addChat}
