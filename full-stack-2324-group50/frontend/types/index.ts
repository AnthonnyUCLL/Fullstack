
import { Person } from "../../back-end/domain/model/person";
import { Chat } from "../../back-end/domain/model/chat";
type Role = 'Admin' | 'Student' | 'Lector'

type User = {
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
}

export type {
    User,
    PersonInput,
    ChatInput,
    MessageInput,
    AuthenticationResponse,
    Role
}
   
