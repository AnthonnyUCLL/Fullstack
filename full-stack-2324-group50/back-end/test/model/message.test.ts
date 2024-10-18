import { Dictionary } from "@prisma/client/runtime/library";
import { Message } from "../../domain/model/message";
import { error } from "console";
import { Chat } from "../../domain/model/chat";
import { Person } from "../../domain/model/person";

const validId: number = 1;
const validTime: Date = new Date(Date.now());
const validText: string = "Hey ! Het is al lang geleden dat we ons niet hebben gezien, zouden we niet afspreken ?";
const validChat: Chat = new Chat({id:1});
const validPerson: Person = new Person({id: 1 ,username:"Nikolai Daelemans", age:20, nationality:"Belg",userId:10})

const invalidId: number = -1;
const invalidText: string = "";

test(`given:valid; when: message is created; then: fields are correct`, () => {

    const message: Message = new Message({id: validId ,time:validTime, text:validText, chat:validChat,person:validPerson});
    expect(message.id).toEqual(validId)
    expect(message.time).toEqual(validTime);
    expect(message.text).toEqual(validText);
    expect(message.chat).toEqual(validChat);
    expect(message.person).toEqual(validPerson);
})

test(`given: negative id; when: message is created; then: negative id is thrown`, () => {
    expect(() => new Message({id: invalidId ,time:validTime, text:validText, chat:validChat,person:validPerson})).toThrow("Id cannot be negative");
})

test(`given: empty text; when: message is created; then: empty message is thrown`, () => {
    expect(() => new Message({id: validId ,time:validTime, text:invalidText, chat:validChat,person:validPerson})).toThrow("Message cannot be empty.");
})






