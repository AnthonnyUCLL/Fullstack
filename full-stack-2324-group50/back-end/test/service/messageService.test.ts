import messageService from "../../service/message.service";
import { Chat } from "../../domain/model/chat";
import { Person } from "../../domain/model/person";
import { Message } from "../../domain/model/message";

const validId: number = 1;
const validTime: Date = new Date(Date.now());
const validText: string = "Hey ! Het is al lang geleden dat we ons niet hebben gezien, zouden we niet afspreken ?";
const validChat: Chat = new Chat({id:1});
const validPerson: Person = new Person({id: 1 ,username:"Nikolai Daelemans", age:20, nationality:"Belg",userId:10})

const invalidId: number = 10;

const mockMessage = new Message({id: validId ,time:validTime, text:validText, chat:validChat,person:validPerson})
const mockMessages = [
    new Message({id: validId ,time:validTime, text:validText, chat:validChat,person:validPerson})
];
jest.mock("../../service/message.service"); 

describe("getAllMessages", () => {
  it("should return all messages", async () => {
    const getAllMessagesMock = jest.spyOn(messageService, "getAllMessages").mockResolvedValue(mockMessages);

    const result = await messageService.getAllMessages();

    expect(result).toEqual(mockMessages);
  });
});

describe("getMessageById", () => {
    it("should return message by id", async () => {
      const getMessageByIdMock = jest.spyOn(messageService, "getMessageById").mockResolvedValue(mockMessage);
  
      const result = await messageService.getMessageById(validId);
  
      expect(result).toEqual(mockMessage);
    });
  });

describe("getMessageById", () => {
    it("should throw an error with a specific message non existing message", async () => {
        const getMessageByIdMock = jest.spyOn(messageService, "getMessageById").mockRejectedValue(new Error(`Message with id ${invalidId} doesn't exist`));
    
        await expect(messageService.getMessageById(validId)).rejects.toThrow(`Message with id ${invalidId} doesn't exist`);
    
        getMessageByIdMock.mockRestore(); // Restore the original function after the test
    });
});

describe("addMessage", () => {
    it("should add message", async () => {
      const addMessageMock = jest.spyOn(messageService, "addMessage").mockResolvedValue(mockMessage);
  
      const result = await messageService.addMessage(mockMessage);
  
      expect(result).toEqual(mockMessage);
    });
  });

describe("addMessage", () => {
    it("should throw an error with a specific message message not added", async () => {
        const addMessageMock = jest.spyOn(messageService, "addMessage").mockRejectedValue(new Error(`Message not added`));
    
        await expect(messageService.addMessage(mockMessage)).rejects.toThrow(`Message not added`);
    
        addMessageMock.mockRestore(); // Restore the original function after the test
    });
});

describe("getAllMessagesByChatId", () => {
    it("should return all messages from given chat", async () => {
      const getAllMessagesByChatIdMock = jest.spyOn(messageService, "getAllMessagesByChatId").mockResolvedValue(mockMessages);
  
      const result = await messageService.getAllMessagesByChatId(validId);
  
      expect(result).toEqual(mockMessages);
    });
  });

  describe("getAllMessagesByPersonId", () => {
    it("should return all messages from given person", async () => {
      const getAllMessagesByPersonIdMock = jest.spyOn(messageService, "getAllMessagesByPersonId").mockResolvedValue(mockMessages);
  
      const result = await messageService.getAllMessagesByPersonId(validId);
  
      expect(result).toEqual(mockMessages);
    });
  });

  describe("deleteMessageById", () => {
    it("should delete message with given id", async () => {
      const deleteMessageByIdMock = jest.spyOn(messageService, "deleteMessageById").mockResolvedValue(mockMessage);
  
      const result = await messageService.deleteMessageById(validId);
  
      expect(result).toEqual(mockMessage);
    });
  });
