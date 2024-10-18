import { promises } from "dns";
import personDb from "../domain/data-access/person.db";
import {Person} from "../domain/model/person";
import { PersonInput } from "../types";
import userDb from "../domain/data-access/user.db";
import { UnauthorizedError } from "express-jwt";
import database from "../util/database";
import { User } from "../domain/model/user";
import chatDb from "../domain/data-access/chat.db";
import { Chat } from "../domain/model/chat";
import chatService from "./chat.service";
import userService from "./user.service";
// JSX
// Components
// Props
// Rendering
// Hooks
// Pages
// Routing

const addPerson = async ({id, username, age, nationality, userId}:PersonInput): Promise<Person> => {
    
    const userPrisma = await database.user.findUnique({
        where: {
            id: userId
        },
        include: {
            person: true
        },
    })

    if(!userPrisma) {
        throw new Error(`User with id ${userId} doesn't exist`)
    }

    if(userPrisma.person) {
        throw new Error(`User already has a Person`)
    }

    const new_person = new Person({
        id, 
        username, 
        age, 
        nationality,
        userId
    });

    personDb.addPerson(new_person);
    return new_person;
}

// Mounting
// Lifecycle phases of a React component
// • The component is created and added to the DOM.
// • With initial state and default props.
// • The render method is called to generate markup.
// • Class components: render is a function of the component class.
// • Functional components: render is the return value of the component function.
// • The return value of a render is a single root HTML node.
// • If you have multiple HTML nodes on the same level, you can use fragments to return
// a single node:
// <>
// <div>…</div>
// <div>…</div>
// </>
// Updating
// Lifecycle phases of a React component
// • Occurs when the component’s state or props change.
// • Current state/props are compared with previous values and
// component is updated.
// • Render function is called again.
// • Goal: component displays latest version of itself.
// • This phase repeats until the component is unmounted.
// Unmounting
// Lifecycle phases of a React component
// • Final phase of a component where it is destroyed and removed from
// the DOM.
// • Cleanup of the component:
// • Event listeners
// • Timers
// • Cancelling external requests
// • …


const deletePersonByUserRNummer = async (rnummer: string, role:string): Promise<Person> => {
    if (role === 'Admin'){
        try {
            const user = await userService.getUserByRnummer(rnummer)
        
            if (user == null) {
                throw new Error(`User with rnummer ${rnummer} doesn't exist`)
            }
            return personDb.deletePersonByUserRNummer(rnummer)
            
        } catch (error) {
            throw new Error("Person not deleted")
        }
    }
    else{
        throw new UnauthorizedError('credentials_required', {message: "You are not authorized to access this ressource."})
    }
}

const getAllPersons = async (role:string): Promise<Person[]> => {
    if(role === "Admin") {
        return await personDb.getAllPersons();
    }
    else{
        throw new UnauthorizedError('credentials_required', {message: "You are not authorized to access this ressource."})
    }
}

const getPersonById = async (id:number): Promise<Person> => {

        const person = await personDb.getPersonById(id);

        if(!person) {
            throw new Error(`Person with id ${id} doesn't exist`)
        }

        return person;
}

const linkPersonToChat = async (personId:number, chatId:number): Promise<Person> => {
    const person = await getPersonById(personId);

    const chat = await chatService.getChatById(chatId);

    const updated_person = await personDb.linkPersonToChat(person.id, chat.id)

    if(!updated_person) {
        throw new Error(`Person not linked to the chat`)
    }

    return updated_person
}

const unlinkPersonFromChat = async (personId:number, chatId:number): Promise<Person> => {
    const person = await getPersonById(personId);

    const chat = await chatService.getChatById(chatId);

    const updated_person = await personDb.unlinkPersonFromChat(person.id, chat.id)

    if(!updated_person) {
        throw new Error(`Person not unlinked to the chat`)
    }

    return updated_person
}

const getChatsOfPersonById = async (id:number): Promise<Chat[]> => {

    const person = await personDb.getPersonById(id);

    if (!person.chats) {
        throw new Error(`Person has no chats`)
    }

    return person.chats;
}

// In contrast to browser storage: cookies are sent back and forth to the
// server with every request: network performance impact.
// • Cookies can have a custom expiration time.
// • Cookies can be subject to security and privacy concerns: eg cross-site
// scripting, session hijacking, tracking, theft,…
// • You can secure cookies with HttpOnly, SameSite,…
const getPersonByChats = async (chats:Chat[], personId:number): Promise<Person[]> => {

    const persons = await personDb.getAllPersons();

    if (!persons) {
        throw new Error(`There are no persons in the database.`)
    }

    const without_original = persons.filter((person) =>
        !(personId == person.id))

    return without_original.filter((person) =>
          person.chats.some((personChat) =>
          chats.some((targetChat) => targetChat.id === personChat.id)
        )
    );  
}

export default {getAllPersons, addPerson, deletePersonByUserRNummer, linkPersonToChat, getPersonById, getChatsOfPersonById, getPersonByChats, unlinkPersonFromChat}