import { Dictionary } from "@prisma/client/runtime/library";
import { Chat } from "../../domain/model/chat";

const validId: number = 1;

const invalidId: number = -1;

test(`given:valid; when: chat is created; then: fields are correct`, () => {

    const message: Chat = new Chat({id: validId});
    expect(message.id).toEqual(validId)
})

test(`given: invalid id; when: chat is created; then: invalid id is thrown`, () => {
    expect(() => new Chat({id: invalidId})).toThrow("Id cannot be negative");
})






