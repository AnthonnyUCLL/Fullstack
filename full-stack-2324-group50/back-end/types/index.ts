import { Chat } from "../domain/model/chat";
import { Person } from "../domain/model/person";

type Role = 'Admin' | 'User'

type UserInput = {
    id? : number;
    rnummer?: string;
    password?: string;
    email?: string;
    role?: Role;
    person?: Person;
};

type PersonInput = {
    id?: number;
    username?: string;
    age?: number;
    nationality?: string;
    // friendslist? : PersonInput[];
    userId?: number;
    chats?: Chat[];
}

type ChatInput = {
    id?: number;
    // persons?: PersonInput[];
}

type MessageInput = {
    id?: number;
    time?: Date;
    personId?: number;
    text?: string;
    chatId?: number;
}

type AuthenticationResponse = {
    token?: string;
    rnummer?: string;
    email?: string;
    role?: string;
}

export {
    UserInput,
    PersonInput,
    ChatInput,
    MessageInput,
    AuthenticationResponse,
    Role
}