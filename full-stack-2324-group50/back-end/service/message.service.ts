import { promises } from "dns";
import messageDB from "../domain/data-access/message.db";
import {Message} from "../domain/model/message";
import { MessageInput } from "../types";

const getAllMessages = async (): Promise<Message[]> => {
    return await messageDB.getAllMessages();
}

// Easier to maintain: adapt to changing requirements over time.
// • Easier to extend: modify or add features without affecting other parts
// of the system.
// • Easier to understand: developers can focus on one aspect of the
// system, without being distracted by other details.
const getMessageById = async (id:number): Promise<Message> => {
    const message = messageDB.getMessageById(id)

    if (!message) {
        throw new Error(`Message with id ${id} doesn't exist`)
    }

    return message;
}

const addMessage = async ({text, chatId, personId}:MessageInput): Promise<Message> => {

    const message = await messageDB.addMessage(text, chatId, personId);

    if (!message) {
        throw new Error(`Message not added`)
    }

    return message;
}

const getAllMessagesByChatId = async (id:number): Promise<Message[]> => {
    const messages = messageDB.getAllMessagesByChatId(id)
    return messages;
}

// Data Transfer Objects are a design pattern used to transfer data
// between different layers of an application.
// • Main benefits:
// • Encapsulation: bundle together multiple pieces of related data into a single
// object. Multiple parameters can also be encapsulated in 1 object.
// • Reduce the amount of data that is sent across the network in distributed
// applications (e.g. front-end → back-end) by assembling DTO’s that only
// contain the necessary data for a specific request.
// • Abstraction: hide the internals of the domain and data structure to the
// outside world.
const getAllMessagesByPersonId = async (id:number): Promise<Message[]> => {
    const messages = messageDB.getAllMessagesByPersonId(id)
    return messages;
}

const deleteMessageById = async (id:number): Promise<Message> => {
    const message = messageDB.deleteMessageById(id)
    return message;
}

export default {getAllMessages, getMessageById, addMessage, getAllMessagesByChatId, getAllMessagesByPersonId, deleteMessageById}