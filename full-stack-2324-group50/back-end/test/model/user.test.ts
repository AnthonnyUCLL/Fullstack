import { Dictionary } from "@prisma/client/runtime/library";
import { User } from "../../domain/model/user";
import { error } from "console";
import { Role } from "../../types";

const validId: number = 1;
const validRnummer: string = "r0000000";
const validPassword: string = "wachtwoord";
const validEmail: string = "Nikolai@ucll.be";
const validRole: Role = 'Admin';

const invalidId: number = -1;
const invalidRnummer: string = "r000";
const invalidEmail: string = "Nikoucll.be";
const invalidEmail2: string = "Nikolai1@ucll.be";
const invalidPassword: string = "wach";
const invalidPassword2: string = "wachwooooooooooooooooord";
const invalidRole: Role = undefined;

test(`given:valid; when: user is created; then: fields are correct`, () => {

    const user: User = new User({id: validId ,rnummer:validRnummer, password:validPassword, email:validEmail, role:validRole});
    expect(user.id).toEqual(validId);
    expect(user.rnummer).toEqual(validRnummer);
    expect(user.email).toEqual(validEmail);
    expect(user.password).toEqual(validPassword);
    expect(user.role).toEqual(validRole);
})

test(`given: negative id; when: user is created; then: negative id is thrown`, () => {
    expect(() => new User({id: invalidId ,rnummer:validRnummer, password:validPassword, email:validEmail, role:validRole})).toThrow("Id cannot be negative.");
})

test(`given: empty rnummer; when: user is created; then: required rnummer is thrown`, () => {
    expect(() => new User({id: validId ,rnummer:null, password:validPassword, email:validEmail, role:validRole})).toThrow("Rnummer is required.");
})

test(`given: invalid rnummer; when: user is created; then: invalid rnummer is thrown`, () => {
    expect(() => new User({id: validId ,rnummer:invalidRnummer, password:validPassword, email:validEmail, role:validRole})).toThrow("Rnummer does not have a correct format.");
})

test(`given: empty mail; when: user is created; then: required mail is thrown`, () => {
    expect(() => new User({id: validId ,rnummer:validRnummer, password:validPassword, email:null, role:validRole})).toThrow("Email is required.");
})

test(`given: invalid mail; when: user is created; then: invalid mail is thrown`, () => {
    expect(() => new User({id: validId ,rnummer:validRnummer, password:validPassword, email:invalidEmail, role:validRole})).toThrow("Email does not have a correct format. Exmaple format: John@ucll.be or JohnDoe@ucll.be (Number are not authorized)");
})

test(`given: invalid mail; when: user is created; then: invalid mail is thrown`, () => {
    expect(() => new User({id: validId ,rnummer:validRnummer, password:validPassword, email:invalidEmail2, role:validRole})).toThrow("Email does not have a correct format. Exmaple format: John@ucll.be or JohnDoe@ucll.be (Number are not authorized)");
})

test(`given: empty password; when: user is created; then: required password is thrown`, () => {
    expect(() => new User({id: validId ,rnummer:validRnummer, password:null, email:validEmail, role:validRole})).toThrow("Password is required.");
})

test(`given: invalid role; when: user is created; then: invalid role is thrown`, () => {
    expect(() => new User({id: validId ,rnummer:validRnummer, password:validPassword, email:validEmail, role:invalidRole})).toThrow("Role does not have the correct format.");
})