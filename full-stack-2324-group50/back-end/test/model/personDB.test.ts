import personDb from "../../domain/data-access/person.db";
import { Chat } from "../../domain/model/chat";
import { Person } from "../../domain/model/person";

const validId: number = 1;
const validUsername: string = "Nikolai Daelemans";
const validAge: number = 20;
const validNationality: string = "belg";
const validUserId: number = 10;

const mockPersons = [
  new Person ({ id: validId, username: validUsername, age: validAge, nationality: validNationality, userId: validUserId }),
];

const mockPerson = new Person ({ id: validId, username: validUsername, age: validAge, nationality: validNationality, userId: validUserId })

const chat = new Chat({id:1})
const chats: Chat[] = [];
chats.push(chat)
const mockPersonLinked = new Person ({ id: validId, username: validUsername, age: validAge, nationality: validNationality, userId: validUserId, chats:chats})


jest.mock("../../domain/data-access/person.db"); // Adjust the import path

describe("getAllPersons", () => {
  it("should return all persons", async () => {
    const getAllPersonsMock = jest.spyOn(personDb, "getAllPersons").mockResolvedValue(mockPersons);

    const result = await personDb.getAllPersons();

    expect(result).toEqual(mockPersons);
  });
});

describe("addPerson", () => {
  it("should add a Person", async () => {
    const addPersonsMock = jest.spyOn(personDb, "addPerson").mockResolvedValue(mockPerson);
  
    const result = await personDb.addPerson(mockPerson);

    expect(result).toEqual(mockPerson);
  });
});

describe("getPersonById", () => {
  it("should return person with given id", async () => {
    const getPersonByIdMock = jest.spyOn(personDb, "getPersonById").mockResolvedValue(mockPerson);
  
    const result = await personDb.getPersonById(validId);

    expect(result).toEqual(mockPerson);
  });
});

describe("linkPersonToChat", () => {
  it("should return person with linked chat", async () => {
    const linkPersonToChatMock = jest.spyOn(personDb, "linkPersonToChat").mockResolvedValue(mockPersonLinked);
  
    const result = await personDb.linkPersonToChat(1, 1);

    expect(result).toEqual(mockPersonLinked);
  });
});

describe("unlinkPersonFromChat", () => {
  it("should return person with unlinked chat", async () => {
    const unlinkPersonFromChatMock = jest.spyOn(personDb, "unlinkPersonFromChat").mockResolvedValue(mockPerson);
  
    const result = await personDb.unlinkPersonFromChat(1, 1);

    expect(result).toEqual(mockPerson);
  });
});



