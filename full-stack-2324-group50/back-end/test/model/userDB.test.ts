import userDb from "../../domain/data-access/user.db";
import { Person } from "../../domain/model/person";
import { User } from "../../domain/model/user";
import { Role } from "../../types";

const validId: number = 1;
const validRnummer: string = "r0886633";
const validPassword: string = "wachtwoord";
const validEmail: string = "Nikolai@ucll.be";
const validRole: Role = 'Admin';

const mockUsers = [
  new User ({ id: validId, rnummer: validRnummer, password:validPassword, email: validEmail, role: validRole})
];

const mockUser = new User ({ id: validId, rnummer: validRnummer, password:validPassword, email: validEmail, role: validRole})

jest.mock("../../domain/data-access/user.db"); 

describe("getAllUsers", () => {
  it("should return all users", async () => {
    const getAllUsersMock = jest.spyOn(userDb, "getAllUsers").mockResolvedValue(mockUsers);

    const result = await userDb.getAllUsers();

    expect(result).toEqual(mockUsers);
  });
});

describe("getUserByRnummer", () => {
  it("should return all users", async () => {

    const getUserByRnummerMock = jest.spyOn(userDb, "getUserByRnummer").mockResolvedValue(mockUser);

    const result = await userDb.getUserByRnummer("r0886633");

    expect(result).toEqual(mockUser);
  });
});

describe("addUser", () => {
  it("should add a User ", async () => {
    const addUserMock = jest.spyOn(userDb, "addUser").mockResolvedValue(mockUser);

    const result = await userDb.addUser(mockUser);

    expect(result).toEqual(mockUser);
  });
});

describe("deleteUserByRnummer", () => {
  it("should delete user with given rnummer", async () => {
    const deleteUserByRnummerMock = jest.spyOn(userDb, "deleteUserByRnummer").mockResolvedValue(mockUser);

    const result = await userDb.deleteUserByRnummer("r0886633");

    expect(result).toEqual(mockUser);
  });
});




