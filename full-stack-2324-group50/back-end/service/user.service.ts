import { add } from "date-fns";
import userDb from "../domain/data-access/user.db";
import {User} from "../domain/model/user";
import { AuthenticationResponse, Role, UserInput } from "../types";
import { promises } from "dns";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../util/jwt";
import { UnauthorizedError } from "express-jwt";
import personService from "./person.service";
import messageService from "./message.service";
import { Message } from "../domain/model/message";

const getAllUsers = async (): Promise<User[]> => {
    return await userDb.getAllUsers();
}

const getUserByRnummer = async (rnummer:string, accept_null:boolean=false): Promise<User> => {
    const regexRnummer = new RegExp('^r\\d{7}$');

    if (!regexRnummer.test(rnummer)) {
        throw new Error("Rnummer hasn't the good format ")
    }

    const user = await userDb.getUserByRnummer(rnummer)
    
    //Some functions will use this function to check if the user doesn't exist, but if that is the case an error will be throwed
    //So these functions must add a third parameter "acceptnull", if this is the case the error is not thrown  
    if(!accept_null) {
        if (user == null) {
            throw new Error(`User with ${rnummer} doesn't exist`)
        }
    }

    return user;
}

const addUser = async ({id, rnummer, password, email, role}:UserInput): Promise<User> => {

    const existing_user = await getUserByRnummer(rnummer, true);

    if (existing_user){
        throw new Error(`User with ${rnummer} already exist`) 
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user_role : Role = role ? role : 'User'

    const new_user = new User({
        id, 
        rnummer, 
        password: hashedPassword, 
        email,
        role:user_role
    });

    const added_user = await userDb.addUser(new_user);

    if (added_user == null) {
        throw new Error("User not added")
    }

    return new_user;
}

const deleteEveryMessage = async (messages:Message[]): Promise<Message[]> => {
    messages.forEach(message => {
        messageService.deleteMessageById(message.id)
    });

    return messages
}

// A REST API is a set of rules and conventions for building and
// interacting with web services (= architecture). The back-end
// applications that we create are implemented according those
// architectural guidelines.
// • REST API’s have become the standard for building web services due to
// their scalability and ease of use.


const deleteUserAndLinkedPersonAndChatsAndMessagesByRnummer = async (rnummer: string, role:string): Promise<User> => {

    if(role === 'Admin') {
        try {
            const user = await userDb.getUserByRnummer(rnummer)
        
            if (user == null) {
                throw new Error(`User with ${rnummer} doesn't exist`)
            }

            const person = user.person
            const toDeleteChats = person.chats

            if(toDeleteChats) {
                const personsWithChatInCommon = await personService.getPersonByChats(toDeleteChats, person.id)

                // • REST:
                // • REpresentational: resources can have multiple representations, e.g. JSON,
                // XML,…. This is specified in the HTTP header of the request.
                // • State: REST is stateless, meaning that every request should be independent
                // and not rely on previous requests. As a consequence, all state information
                // should be sent with each request.
                // • Transfer: resources and state are transferred using HTTP methods (GET, POST,
                // PUT, DELETE).
                // • API = Application Programming Interface
                personsWithChatInCommon.forEach(person => {
                    for(let i = 0; i < person.chats.length; i++) {  
                        for(let j = 0; j < toDeleteChats.length; j++) {
                            if(person.chats[i].id == toDeleteChats[j].id) {
                                const chatId = toDeleteChats[j].id
                                const personId = person.id
                                personService.unlinkPersonFromChat(personId, chatId) 
                            }
                        }
                    }
                });
            }

            const messages = await messageService.getAllMessagesByPersonId(person.id)

            if(messages) {
                const deleted_messages = await deleteEveryMessage(messages)
            }
            
            const deletedUser = await userDb.deleteUserByRnummer(rnummer)
            if(!deletedUser) {
                throw new Error("User not deleted")
            }
            return deletedUser

        } catch (error) {
            throw new Error("User not deleted")
        }
    }
    else{
        throw new UnauthorizedError('credentials_required', {message: "You are not authorized to access this ressource."})
    }
 
}

const authenticate = async ({rnummer, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByRnummer(rnummer);
    
    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) { 
        throw new Error('Incorrect password');
    }
    
    return {
        token: generateJwtToken({rnummer, role: user.role}),
        rnummer,
        email: user.email,
        role: user.role
    }
};

export default {getAllUsers, addUser, getUserByRnummer, deleteUserAndLinkedPersonAndChatsAndMessagesByRnummer, authenticate}