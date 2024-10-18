import chatDb from "../../domain/data-access/chat.db";
import { Chat } from "../../domain/model/chat";

const validId: number = 1;

const mockChats = [
  new Chat ({ id: validId}),
];

const mockChat = new Chat ({ id: validId})

jest.mock("../../domain/data-access/chat.db");

describe("getAllChats", () => {
    it("should return all chats", async () => {
      const getAllChatsMock = jest.spyOn(chatDb, "getAllChats").mockResolvedValue(mockChats);
  
      const result = await chatDb.getAllChats();
  
      expect(result).toEqual(mockChats);
    });
  });

describe("getChatById", () => {
it("should return chat with id 1", async () => {
    const getChatByIdMock = jest.spyOn(chatDb, "getChatById").mockResolvedValue(mockChat);

    const result = await chatDb.getChatById(1);

    expect(result).toEqual(mockChat);
});
});

describe("addChat", () => {
    it("should return added chat", async () => {
        const addChatMock = jest.spyOn(chatDb, "addChat").mockResolvedValue(mockChat);
    
        const result = await chatDb.addChat();
    
        expect(result).toEqual(mockChat);
    });
    });