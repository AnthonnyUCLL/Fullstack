/**
 * @swagger 
 *  components:
 *   securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *   schemas:
 *      Chat:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *            example: 1
 */
import express, {Request, Response} from "express"
import chatService from "../service/chat.service"
import { Chat } from "../domain/model/chat"
import { ChatInput } from "../types"

const chatRouter = express.Router()


/**
 * @swagger 
 * /api/chats:
 *  get: 
 *      security:
 *       - bearerAuth: []
 *      tags: 
 *          - Chats
 *      summary: Find all chats
 *      responses:
 *          200:
 *              description: All existing chats
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Chat'
 */
chatRouter.get('/', async (req: Request & {auth: any}, res: Response) => {
    try {
        const chats = await chatService.getAllChats()
        res.status(200).json(chats)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})


/**
 * @swagger 
 * /api/chats/{chatId}:
 *  get: 
 *      security:
 *       - bearerAuth: []
 *      tags: 
 *          - Chats
 *      summary: Find chat by id
 *      parameters:
 *       -  name: chatId
 *          in: path
 *          description: id of the chat 
 *          required: true
 *          schema:
 *              type: number
 *          example: 1
 *      responses:
 *          200:
 *              description: Chat with the given id has been founded
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Chat'
 */
chatRouter.get('/:chatId', async (req: Request & {auth: any}, res: Response) => {
    try {
        const chatId: number = parseInt(req.params.chatId);

        const chats = await chatService.getChatById(chatId)
        res.status(200).json(chats)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger 
 * /api/chats/createChat:
 *  post:
 *      security:
 *       - bearerAuth: [] 
 *      tags: 
 *          - Chats
 *      summary: Create a new chat 
 *      responses:
 *          200:
 *              description: The chat has been created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Chat'
 */
chatRouter.post('/createChat', async (req: Request & {auth: any}, res: Response) => {
    try {
        const result = await chatService.addChat();
        res.status(200).json(result)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

export default chatRouter;