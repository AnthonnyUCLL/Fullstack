import database from "../../util/database";
import { User } from "../model/user";
import { PrismaClient, Prisma } from "@prisma/client";
import {User as UserPrisma} from '@prisma/client'

const prisma = new PrismaClient();

const client = new PrismaClient()

const getAllUsers = async (): Promise<User[]> => {
    
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                person: {
                    include: {
                      chats: true, // Include the chats from the Person entity
                    },
                },
            },
        })
    
        return usersPrisma.map((usersPrisma) => User.from(usersPrisma));
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}


const getUserByRnummer = async (rnummer: string): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                rnummer: rnummer
            },
            include: {
                person: {
                    include: {
                      chats: true, // Include the chats from the Person entity
                    },
                },
            },
        })

        return userPrisma ? User.from(userPrisma) : null

    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}

const addUser = async ({id, rnummer, password, email, role} :User): Promise<UserPrisma> => { 
    // const new_user = new User({
    //     id, 
    //     rnummer, 
    //     password, 
    //     email,
    //     role
    // });

    try {
        const user = await prisma.user.create({
            data: {
                rnummer: rnummer,
                password: password,
                email: email,
                role: role
            },
          });
        
          return user;
        } 
    catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
      }
}


const deleteUserByRnummer = async (rnummer: string): Promise<User> => {
    try {
        const userPrisma = await database.user.delete({
            where: {
                rnummer: rnummer
            },
            include: {
                person: {
                    include: {
                        chats: true 
                    }
                }
            },
        })
    
        return userPrisma ? User.from(userPrisma) : null
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.'); 
    }
}

export default {getAllUsers, addUser, getUserByRnummer, deleteUserByRnummer}
