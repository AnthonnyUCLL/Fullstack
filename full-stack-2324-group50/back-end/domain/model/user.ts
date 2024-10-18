import {User as UserPrisma} from '@prisma/client'
import {Person as PersonPrisma} from '@prisma/client'
import { Person } from './person';
import { Role } from '../../types';
export class User {
 
    readonly id: number;
    readonly rnummer: string;
    readonly password: string;
    readonly email: string;
    readonly person: Person;
    readonly role: Role;

    constructor(user:{id: number, rnummer:string, password:string, email:string, role:Role, person?:Person}) {
        this.validate(user)
        
        this.id = user.id;
        this.rnummer = user.rnummer;
        this.password = user.password;
        this.email = user.email;
        this.person = user.person ?? null;
        this.role = user.role;
    }

    validate(user:{id: number, rnummer:string, password:string, email:string, role:Role, person?:Person})
    {
        if (user.id <= 0) {
            throw new Error('Id cannot be negative.')
        }   
        const regexRnummer = new RegExp('^r\\d{7}$');

        if (!user.rnummer?.trim()) {
            throw new Error("Rnummer is required.")
        }

        if (!regexRnummer.test(user.rnummer)) {
            throw new Error("Rnummer does not have a correct format.")
        }

        if (!user.email?.trim()) {
            throw new Error("Email is required.")
        }

        const regexMail = new RegExp('^[A-Za-z._%+-]+@ucll\\.be');
        if (!regexMail.test(user.email)) {
            throw new Error("Email does not have a correct format. Exmaple format: John@ucll.be or JohnDoe@ucll.be (Number are not authorized)")
        }

        if (!user.password?.trim()) {
            throw new Error("Password is required.")
        }

        if (user.role !== 'Admin' && user.role !== 'User') {
            throw new Error("Role does not have the correct format.")
        }
    }

    static from({
        id,
        rnummer,
        password,
        email,
        role,
        person
    }: UserPrisma & { person: PersonPrisma}) {

        const user = new User({
            id, 
            rnummer, 
            password, 
            email,
            role: role as Role
        });
        
        return new User({
            id,
            rnummer,
            password,
            email,
            role: role as Role,
            person: person ? Person.from(person) : null
        })
    }
}