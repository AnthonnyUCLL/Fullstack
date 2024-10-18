/**
 * @swagger 
 *  components:
 *   securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *   schemas:
 *      Message:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *            example: 1 
 *          time: 
 *            type: Date
 *            description: Datum en tijd van wanneer het bericht gestuurd is
 *            example: "2021-09-27 15:22:53.679985+02" 
 *          text:
 *            type: string
 *            description: "Inhoud van het bericht"
 *            example: "Hey hoe gaat het Elke ?"
 *          chat:
 *            $ref: '#/components/schemas/Chat' 
 *          person:
 *            $ref: '#/components/schemas/Person'
 *      MessageInput:
 *        type: object
 *        properties:
 *          text: 
 *            type: string
 *            description: "Inhoud van het te sturen bericht"
 *            example: "Hey ! Het is al lang geleden dat we ons niet hebben gezien, zouden we niet afspreken ?"
 *          chatId:
 *            type: number
 *            format: int64
 *            description: "Id of the chat"
 *            example: 4     
 *          personId:
 *            type: number
 *            format: int64
 *            description: "Id of the person that sends the message"
 *            example: 4        
 */
import express, {Request, Response} from "express"
import messageService from "../service/message.service"
import { Scheduler } from "timers/promises"
import { Message } from "../domain/model/message"
import { MessageInput } from "../types"

const messageRouter = express.Router()

/**
 * @swagger 
 * /api/messages:
 *  get:
 *      security:
 *       - bearerAuth: [] 
 *      tags: 
 *          - Messages
 *      summary: Find all messages
 *      responses:
 *          200:
 *              description: Got every messages
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Message'
 */
messageRouter.get('/', async (req: Request & {auth: any}, res: Response) => {
    try {
        const messages = await messageService.getAllMessages()
        res.status(200).json(messages)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger 
 * /api/messages/messageByChatId/{chatId}:
 *  get:
 *      security:
 *       - bearerAuth: [] 
 *      tags: 
 *          - Messages
 *      summary: Find all messages with a specific chatId
 *      parameters:
 *       -  name: chatId
 *          in: path
 *          description: Id of the chat 
 *          required: true
 *          schema:
 *              type: number
 *              format: int64
 *          example: 1
 *      responses:
 *          200:
 *              description: Got every messages
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Message'
 */
messageRouter.get('/messageByChatId/:chatId', async (req: Request & {auth: any}, res: Response) => {
    try {
        const chatId: number = parseInt(req.params.chatId);
        const messages = await messageService.getAllMessagesByChatId(chatId)
        res.status(200).json(messages)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger 
 * /api/messages/{messageId}:
 *  get:
 *      security:
 *       - bearerAuth: []  
 *      tags: 
 *          - Messages
 *      summary: Get message by id
 *      parameters:
 *       -  name: messageId
 *          in: path
 *          description: Id of the message 
 *          required: true
 *          schema:
 *              type: number
 *              format: int64
 *          example: 1
 *      responses:
 *          200:
 *              description: Complete message
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Message'
 */
messageRouter.get('/:messageId', async (req: Request & {auth: any}, res: Response) => {
    try {
        const messageId: number = parseInt(req.params.messageId);
        
        const messages = await messageService.getMessageById(messageId)
        res.status(200).json(messages)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger 
 * /api/messages/addMessage:
 *  post:
 *      security:
 *       - bearerAuth: [] 
 *      tags: 
 *          - Messages
 *      summary: Create a new message 
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/MessageInput'
 *      responses:
 *          200:
 *              description: The message has been created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Message'
 */
messageRouter.post('/addMessage', async (req: Request & {auth: any}, res: Response) => {
    try {
        const message = <MessageInput>req.body;
        const result = await messageService.addMessage(message);
        res.status(200).json(result)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

export default messageRouter;