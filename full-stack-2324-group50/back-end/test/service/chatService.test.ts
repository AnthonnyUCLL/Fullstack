import { Chat } from "../../domain/model/chat";
import chatService from "../../service/chat.service";

const validId: number = 1;

const invalidId: number = 20;

const mockChats = [
  new Chat ({ id: validId}),
];

const mockChat = new Chat ({ id: validId})

jest.mock("../../service/chat.service"); 

describe("getAllChats", () => {
  it("should return all chats", async () => {
    const getAllChatsMock = jest.spyOn(chatService, "getAllChats").mockResolvedValue(mockChats);

    const result = await chatService.getAllChats();

    expect(result).toEqual(mockChats);
  });
});

describe("getChatById", () => {
    it("should return chat by id", async () => {
      const getChatByIdMock = jest.spyOn(chatService, "getChatById").mockResolvedValue(mockChat);
  
      const result = await chatService.getChatById(validId);
  
      expect(result).toEqual(mockChat);
    });
  });

describe("getChatById", () => {
    it("should throw an error with a message chat non existing", async () => {
        const getChatByIdMock = jest.spyOn(chatService, "getChatById").mockRejectedValue(new Error(`Chat with id ${invalidId} doesn't exist`));
    
        await expect(chatService.getChatById(validId)).rejects.toThrow(`Chat with id ${invalidId} doesn't exist`);
    
        getChatByIdMock.mockRestore(); // Restore the original function after the test
    });
});

describe("addChat", () => {
    it("should add given chats", async () => {
      const addChatMock = jest.spyOn(chatService, "addChat").mockResolvedValue(mockChat);
  
      const result = await chatService.addChat();
  
      expect(result).toEqual(mockChat);
    });
  });

  describe("addChat", () => {
    it("should throw an error with a message chat not added", async () => {
        const addChatMock = jest.spyOn(chatService, "addChat").mockRejectedValue(new Error(`Chat not added`));
    
        await expect(chatService.addChat()).rejects.toThrow(`Chat not added`);
    
        addChatMock.mockRestore(); // Restore the original function after the test
    });
});


