import personService from "../../service/person.service";
import { Chat } from "../../domain/model/chat";
import { Person } from "../../domain/model/person";

const validId: number = 1;
const validUsername: string = "Nikolai Daelemans";
const validAge: number = 20;
const validNationality: string = "belg";
const validUserId: number = 10;

const invalidUserId: number = 200;

const mockPersons = [
  new Person ({ id: validId, username: validUsername, age: validAge, nationality: validNationality, userId: validUserId }),
];

const mockPerson = new Person ({ id: validId, username: validUsername, age: validAge, nationality: validNationality, userId: validUserId })

const chat = new Chat({id:1})
const chats: Chat[] = [];
chats.push(chat)
const mockPersonLinked = new Person ({ id: validId, username: validUsername, age: validAge, nationality: validNationality, userId: validUserId, chats:chats})

jest.mock("../../service/person.service"); 

describe("addPerson", () => {
  it("should add person", async () => {
    const addPersonMock = jest.spyOn(personService, "addPerson").mockResolvedValue(mockPerson);

    const result = await personService.addPerson(mockPerson);

    expect(result).toEqual(mockPerson);
  });
});

describe("addPerson", () => {
    it("should throw an error with a specific message an non existing user", async () => {
        const addUserMock = jest.spyOn(personService, "addPerson").mockRejectedValue(new Error(`User with id ${invalidUserId} doesn't exist`));
    
        await expect(personService.addPerson(mockPerson)).rejects.toThrow(`User with id ${invalidUserId} doesn't exist`);
    
        addUserMock.mockRestore(); // Restore the original function after the test
    });
});

describe("addPerson", () => {
    it("should throw an error with a specific message user already has a person", async () => {
        const addUserMock = jest.spyOn(personService, "addPerson").mockRejectedValue(new Error(`User already has a Person`));
    
        await expect(personService.addPerson(mockPerson)).rejects.toThrow(`User already has a Person`);
    
        addUserMock.mockRestore(); // Restore the original function after the test
    });
});

describe("getAllPersons", () => {
    it("should return all persons", async () => {
      const getAllPersonsMock = jest.spyOn(personService, "getAllPersons").mockResolvedValue(mockPersons);
  
      const result = await personService.getAllPersons('Admin');
  
      expect(result).toEqual(mockPersons);
    });
  });

describe("getPersonById", () => {
it("should return person with given id", async () => {
    const getPersonByIdMock = jest.spyOn(personService, "getPersonById").mockResolvedValue(mockPerson);

    const result = await personService.getPersonById(validId);

    expect(result).toEqual(mockPerson);
});
});

describe("getPersonById", () => {
    it("should throw an error with a specific message non existing person", async () => {
        const getPersonByIdMock = jest.spyOn(personService, "getPersonById").mockRejectedValue(new Error(`Person with id ${invalidUserId} doesn't exist`));
    
        await expect(personService.getPersonById(invalidUserId)).rejects.toThrow(`Person with id ${invalidUserId} doesn't exist`);
    
        getPersonByIdMock.mockRestore(); // Restore the original function after the test
    });
});

describe("linkPersonToChat", () => {
    it("should return person after linking it to a chat", async () => {
        const linkPersonToChatMock = jest.spyOn(personService, "linkPersonToChat").mockResolvedValue(mockPerson);
    
        const result = await personService.linkPersonToChat(validId, validId);
    
        expect(result).toEqual(mockPerson);
    });
});

describe("unlinkPersonFromChat", () => {
    it("should return person with given id", async () => {
        const unlinkPersonFromChatMock = jest.spyOn(personService, "unlinkPersonFromChat").mockResolvedValue(mockPerson);
    
        const result = await personService.unlinkPersonFromChat(validId, validId);
    
        expect(result).toEqual(mockPerson);
    });
});

describe("getChatsOfPersonById", () => {
    it("should return person with given id", async () => {
        const getChatsOfPersonByIdMock = jest.spyOn(personService, "getChatsOfPersonById").mockResolvedValue(mockPerson.chats);
    
        const result = await personService.getChatsOfPersonById(validId);
    
        expect(result).toEqual(mockPerson.chats);
    });
});



