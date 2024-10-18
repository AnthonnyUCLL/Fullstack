import { Dictionary } from "@prisma/client/runtime/library";
import { Person } from "../../domain/model/person";
import { error } from "console";

const validId: number = 1;
const validUsername: string = "Nikolai Daelemans";
const validAge: number = 20;
const validNationality: string = "belg";
const validUserId: number = 10;

const invalidId: number = -1;
const invalidUsername: string = "Nikolai3 Daelemans";
const invalidAge: number = -20;
const invalidAge2: number = 120;
const invalidNationality: string = "Belg4";
const invalidUserId: number = -10;


test(`given:valid; when: person is created; then: fields are correct`, () => {

    const person: Person = new Person({id: validId ,username:validUsername, age:validAge, nationality:validNationality,userId:validUserId});
    expect(person.id).toEqual(validId)
    expect(person.username).toEqual(validUsername);
    expect(person.age).toEqual(validAge);
    expect(person.nationality).toEqual(validNationality);
    expect(person.userId).toEqual(validUserId);
})

test(`given: negative id; when: person is created; then: negative id is thrown`, () => {
    expect(() => new Person({id: invalidId ,username:validUsername, age:validAge, nationality:validNationality,userId:validUserId})).toThrow("Id cannot be negative");
})

test(`given: invalid username; when: person is created; then: invalid username is thrown`, () => {
    expect(() => new Person({id: validId ,username:invalidUsername, age:validAge, nationality:validNationality,userId:validUserId})).toThrow("Username cannot contain numbers.");
})

test(`given: invalid age; when: person is created; then: invalid age is thrown`, () => {
    expect(() => new Person({id: validId ,username:validUsername, age:invalidAge, nationality:validNationality,userId:validUserId})).toThrow("Your age cannot be more than 100 or less than 0.");
})

test(`given: invalid age; when: person is created; then: invalid age is thrown`, () => {
    expect(() => new Person({id: validId ,username:validUsername, age:invalidAge2, nationality:validNationality,userId:validUserId})).toThrow("Your age cannot be more than 100 or less than 0.");
})

test(`given: invalid nationality; when: person is created; then: invalid nationality is thrown`, () => {
    expect(() => new Person({id: validId ,username:validUsername, age:validAge, nationality:invalidNationality,userId:validUserId})).toThrow("Nationality cannot contain numbers.");
})

test(`given: invalid userId; when: person is created; then: invalid userId is thrown`, () => {
    expect(() => new Person({id: validId ,username:validUsername, age:validAge, nationality:validNationality,userId:invalidUserId})).toThrow("Id cannot be negative");
})



