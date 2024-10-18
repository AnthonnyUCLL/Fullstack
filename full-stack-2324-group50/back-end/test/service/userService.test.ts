import userService from "../../service/user.service";
import { User } from "../../domain/model/user";
import { Role } from "../../types";

const validId: number = 1;
const validRnummer: string = "r0886633";
const validPassword: string = "wachtwoord";
const validEmail: string = "Nikolai@ucll.be";
const validRole: Role = 'Admin';

const invalidRnummer: string = "r000";

const authenticate = {validRnummer, validPassword}
const message:string = "Authentication succesful"
const token: string = "eyJhbGciOiJIU5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36"

const response = {message, token, validRnummer, validEmail, validRole}
const mockUsers = [
  new User ({ id: validId, rnummer: validRnummer, password:validPassword, email: validEmail, role: validRole})
];

const mockUser = new User ({ id: validId, rnummer: validRnummer, password:validPassword, email: validEmail, role: validRole})

jest.mock("../../service/user.service"); 

describe("getAllUsers", () => {
  it("should return all users", async () => {
    const getAllUsersMock = jest.spyOn(userService, "getAllUsers").mockResolvedValue(mockUsers);

    const result = await userService.getAllUsers();

    expect(result).toEqual(mockUsers);
  });
});

describe("getUserByRnummer", () => {
    it("should return users with given rnummer", async () => {
      const getUserByRnummerMock = jest.spyOn(userService, "getUserByRnummer").mockResolvedValue(mockUser);
  
      const result = await userService.getUserByRnummer(validRnummer);
  
      expect(result).toEqual(mockUser);
    });
  });

describe("getUserByRnummer", () => {
    it("should throw an error with a specific message for invalid rnummer", async () => {
        const getUserByRnummerMock = jest.spyOn(userService, "getUserByRnummer").mockRejectedValue(new Error("Rnummer hasn't the good format"));

        await expect(userService.getUserByRnummer(invalidRnummer)).rejects.toThrow("Rnummer hasn't the good format");

        getUserByRnummerMock.mockRestore(); // Restore the original function after the test
    });
});

describe("getUserByRnummer", () => {
    it("should throw an error with a specific message for non existing user", async () => {
        const getUserByRnummerMock = jest.spyOn(userService, "getUserByRnummer").mockRejectedValue(new Error(`User with ${validRnummer} doesn't exist`));
    
        await expect(userService.getUserByRnummer(validRnummer)).rejects.toThrow(`User with ${validRnummer} doesn't exist`);
    
        getUserByRnummerMock.mockRestore(); // Restore the original function after the test
    });
});

describe("addUser", () => {
    it("should add given user", async () => {
        const addUserMock = jest.spyOn(userService, "addUser").mockResolvedValue(mockUser);

        const result = await userService.addUser(mockUser);

        expect(result).toEqual(mockUser);
        addUserMock.mockRestore(); // Restore the original function after the test
    });
});

describe("addUser", () => {
    it("should throw an error with a specific message an already exiting user", async () => {
        const addUserMock = jest.spyOn(userService, "addUser").mockRejectedValue(new Error(`User with ${validRnummer} already exist`));
    
        await expect(userService.addUser(mockUser)).rejects.toThrow(`User with ${validRnummer} already exist`);
    
        addUserMock.mockRestore(); // Restore the original function after the test
    });
});

describe("addUser", () => {
    it("should throw an error with a specific message an non added user", async () => {
        const addUserMock = jest.spyOn(userService, "addUser").mockRejectedValue(new Error(`User not added`));
    
        await expect(userService.addUser(mockUser)).rejects.toThrow(`User not added`);
    
        addUserMock.mockRestore(); // Restore the original function after the test
    });
});

describe("deleteUserAndLinkedPersonAndChatsAndMessagesByRnummer", () => {
    it("should delete user by given rnummer", async () => {
        const deleteUserAndLinkedPersonAndChatsAndMessagesByRnummerMock = jest.spyOn(userService, "deleteUserAndLinkedPersonAndChatsAndMessagesByRnummer").mockResolvedValue(mockUser);

        const result = await userService.deleteUserAndLinkedPersonAndChatsAndMessagesByRnummer(validRnummer, 'Admin');

        expect(result).toEqual(mockUser);
        deleteUserAndLinkedPersonAndChatsAndMessagesByRnummerMock.mockRestore(); // Restore the original function after the test
    });
});

describe("authenticate", () => {
    it("should authenticate user", async () => {
        const authenticateMock = jest.spyOn(userService, "authenticate").mockResolvedValue(response);

        const result = await userService.authenticate(mockUser);

        expect(result).toEqual(response);
        authenticateMock.mockRestore(); // Restore the original function after the test
    });
});

describe("authenticate", () => {
    it("should throw an error with a specific message, an invalid password", async () => {
        const authenticateMock = jest.spyOn(userService, "authenticate").mockRejectedValue(new Error(`Incorrect password`));
    
        await expect(userService.authenticate(mockUser)).rejects.toThrow(`Incorrect password`);
    
        authenticateMock.mockRestore(); // Restore the original function after the test
    });
});
