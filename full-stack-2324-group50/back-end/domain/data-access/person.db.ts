import { Person } from "../model/person";
import { PrismaClient } from "@prisma/client";
import database from "../../util/database";
import {Person as PersonPrisma} from '@prisma/client'
import { Chat } from "../model/chat";
import {Chat as ChatPrisma} from '@prisma/client'

const prisma = new PrismaClient();


const getAllPersons = async (): Promise<Person[]> => {

    try {
        const personsPrisma = await database.person.findMany({
            include: {
                chats: true,
            }
        })
    
        return personsPrisma.map((personsPrisma) => Person.from(personsPrisma));
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.'); 
    }
}

const linkPersonToChat = async (personId:number, chatId:number): Promise<Person> => {
    try {
        const personPrisma = await database.person.update({
          where: { 
            id: personId 
        },
          data: {
            chats: {
                connect: [{ id: chatId }],
              },
          },
          include: {
            chats: true, 
        },
        });

        return personPrisma ? Person.from(personPrisma) : null
    
      } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
      }
}


const unlinkPersonFromChat = async (personId:number, chatId:number): Promise<Person> => {
    try {
        const personPrisma = await database.person.update({
          where: { 
            id: personId 
        },
          data: {
            chats: {
                disconnect: [{ id: chatId }],
              },
          },
          include: {
            chats: true, 
        },
        });

        return personPrisma ? Person.from(personPrisma) : null
    
      } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
      }
}


const getPersonById = async (personId:number): Promise<Person> => {
    try {
        const personPrisma = await database.person.findUnique({
            where: {
                id: personId
            },
            include: {
                chats: true
            },
        })

        return personPrisma ? Person.from(personPrisma) : null

    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}

const addPerson = async ({id, username, age, nationality, userId}:Person): Promise<PersonPrisma> => { 
    try {
        const new_person = new Person({
            id, 
            username, 
            age, 
            nationality,
            userId
        });
    
        const person = await database.person.create({
            data: {
                username: new_person.username,
                age: new_person.age,
                nationality: new_person.nationality,
                userId: new_person.userId
            },
          });
    
        return new_person;
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.'); 
    }
}

const deletePersonByUserRNummer = async (rNummer: string): Promise<Person> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                rnummer: rNummer
            }
        })
    
        const personPrisma = await database.person.delete({
            where: {
                userId: userPrisma.id
            },
            include: {
                chats: true, // Include the chats from the Person entity
              },
        })
    
        return Person.from(personPrisma);
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.'); 
    }
}


export default {getAllPersons, addPerson, deletePersonByUserRNummer, getPersonById, linkPersonToChat, unlinkPersonFromChat}
