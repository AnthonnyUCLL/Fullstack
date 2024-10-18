import messageDb from "../../domain/data-access/message.db";
import { Chat } from "../../domain/model/chat";
import { Message } from "../../domain/model/message";
import { Person } from "../../domain/model/person";

const validId: number = 1;
const validTime: Date = new Date(Date.now());
const validText: string = "Hey ! Het is al lang geleden dat we ons niet hebben gezien, zouden we niet afspreken ?";
const validChat: Chat = new Chat({id:1});
const validPerson: Person = new Person({id: 1 ,username:"Nikolai Daelemans", age:20, nationality:"Belg",userId:10})

const mockMessage = new Message({id: validId ,time:validTime, text:validText, chat:validChat,person:validPerson})
const mockMessages = [
    new Message({id: validId ,time:validTime, text:validText, chat:validChat,person:validPerson})
];

jest.mock("../../domain/data-access/message.db");

describe("getAllMessages", () => {
    it("should return all messages", async () => {
        const getAllMessagesMock = jest.spyOn(messageDb, "getAllMessages").mockResolvedValue(mockMessages);

        const result = await messageDb.getAllMessages();

        expect(result).toEqual(mockMessages);
    });
});

describe("getMessageById", () => {
    it("should return message with given id", async () => {
        const getMessageByIdMock = jest.spyOn(messageDb, "getMessageById").mockResolvedValue(mockMessage);

        const result = await messageDb.getMessageById(validId);

        expect(result).toEqual(mockMessage);
    });
});

describe("addMessage", () => {
    it("should add given message", async () => {
        const addMessageMock = jest.spyOn(messageDb, "addMessage").mockResolvedValue(mockMessage);

        const result = await messageDb.addMessage(validText, 1, 1);

        expect(result).toEqual(mockMessage);
    });
});

describe("getAllMessagesByChatId", () => {
    it("should return all messages from specific chat", async () => {
        const getAllMessagesByChatIdMock = jest.spyOn(messageDb, "getAllMessagesByChatId").mockResolvedValue(mockMessages);

        const result = await messageDb.getAllMessagesByChatId(1);

        expect(result).toEqual(mockMessages);
    });
});

describe("getAllMessagesByPersonId", () => {
    it("should return all messages from specific person", async () => {
        const getAllMessagesByPersonIdMock = jest.spyOn(messageDb, "getAllMessagesByPersonId").mockResolvedValue(mockMessages);

        const result = await messageDb.getAllMessagesByPersonId(1);

        expect(result).toEqual(mockMessages);
    });
});

describe("deleteMessageById", () => {
    it("should delete specific message", async () => {
        const deleteMessageByIdMock = jest.spyOn(messageDb, "deleteMessageById").mockResolvedValue(mockMessage);

        const result = await messageDb.deleteMessageById(1);

        expect(result).toEqual(mockMessage);
    });
});