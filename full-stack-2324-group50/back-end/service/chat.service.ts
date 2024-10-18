import { promises } from "dns";
import chatDB from "../domain/data-access/chat.db";
import {Chat} from "../domain/model/chat";
import { ChatInput } from "../types";
// User sign-up
// • Password encryption
// • Authentication
// • User login process
// • Protecting API routes
// • Authorisation
// • Does the logged-in user have the correct
// permissions?
// • Secure HTTP traffic
// • Make HTTP requests/responses less vulnerable.
const getAllChats = async (): Promise<Chat[]> => chatDB.getAllChats();

const getChatById = async (id:number): Promise<Chat> => {
    const chat = chatDB.getChatById(id);
    if (!chat) {
        throw new Error(`Chat with id ${id} doesn't exist`)
    }

    return chat; 
}

// A library providing a collection of middleware functions that
// addresses multiple web vulnerabilities by:
// • Setting various HTTP headers to mitigate security breaches.
// • Preventing information leakage by removing vulnerable HTTP headers.
// • Enforcing security best practices, by setting a Content Security Policy that
// prevents unauthorized (malicious) resources to be loaded
const addChat = async (): Promise<Chat> => {

    const added_chat = await chatDB.addChat();

    const new_chat = new Chat({
        id:added_chat.id,    
    })

    if (!added_chat) {
        throw new Error(`Chat not added`)
    }
    

    return new_chat;
}

export default {getAllChats, getChatById, addChat}