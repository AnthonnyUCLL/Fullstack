/**
 * @swagger 
 *  components:
 *   securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *   schemas:
 *      Person:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *            example: 4 
 *          username: 
 *            type: string
 *            description: Username van de person
 *            example: "admin" 
 *          age:
 *            type: number
 *            format: int64
 *            example: 20 
 *          nationality:
 *            type: string
 *            description: Nationality van de person
 *            example: "Belgisch"  
 *          userId:
 *            type: number
 *            format: int64
 *            example: 4
 *          chats:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Chat' 
 *      PersonInput:
 *        type: object
 *        properties:
 *          username: 
 *            type: string
 *            description: Username van de person
 *            example: "Kevin" 
 *          age:
 *            type: number
 *            format: int64
 *            example: 20 
 *          nationality:
 *            type: string
 *            description: Nationality van de person
 *            example: "Belgium"  
 *          userId:
 *            type: number
 *            format: int64
 *            example: 6          
 */
import express, {Request, Response} from "express"
import personService from "../service/person.service"
import { Scheduler } from "timers/promises"
import { Person } from "../domain/model/person"
import { PersonInput } from "../types"
import { Chat } from "../domain/model/chat"

const personRouter = express.Router()

// /**
//  * @swagger 
//  * /api/persons/{rNummer}:
//  *  delete:
//  *      security:
//  *       - bearerAuth: []  
//  *      tags: 
//  *          - Persons
//  *      summary: Delete person by rNummer
//  *      parameters:
//  *       -  name: rNummer
//  *          in: path
//  *          description: rNumber of the user 
//  *          required: true
//  *          schema:
//  *              type: string
//  *          example: "r0123456"
//  *      responses:
//  *          200:
//  *              description: Person of the given user
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: '#/components/schemas/Person'
//  */
// personRouter.delete('/:rNummer', async (req: Request & {auth: any}, res: Response) => {
//     try {
//         const rNummer: string = req.params.rNummer;
//         const {role} = req.auth
//         const person = await personService.deletePersonByUserRNummer(rNummer, role)
//         res.status(200).json(person)
//     }
//     catch(error) {
//         res.status(400).json({status: 'error', errorMessage: error.message})
//     }
// })

/**
 * @swagger 
 * /api/persons/{personId}:
 *  get:
 *      security:
 *       - bearerAuth: []  
 *      tags: 
 *          - Persons
 *      summary: Get person by id
 *      parameters:
 *       -  name: personId
 *          in: path
 *          description: Id of the person 
 *          required: true
 *          schema:
 *              type: number
 *          example: 4
 *      responses:
 *          200:
 *              description: Person with the given id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Person'
 */
personRouter.get('/:personId', async (req: Request & {auth: any}, res: Response) => {
    try {
        const personId: number = parseInt(req.params.personId);
        const person = await personService.getPersonById(personId)
        res.status(200).json(person)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger 
 * /api/persons/getChatsOfPerson/{personId}:
 *  get:
 *      security:
 *       - bearerAuth: []  
 *      tags: 
 *          - Persons
 *      summary: Get chats of a person by id
 *      parameters:
 *       -  name: personId
 *          in: path
 *          description: Id of the person 
 *          required: true
 *          schema:
 *              type: number
 *          example: 4
 *      responses:
 *          200:
 *              description: Arrays of every chat of the person
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Chat'
 */
personRouter.get('/getChatsOfPerson/:personId', async (req: Request & {auth: any}, res: Response) => {
    try {
        const personId: number = parseInt(req.params.personId);
        const person = await personService.getChatsOfPersonById(personId)
        res.status(200).json(person)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger 
 * /api/persons/getPersonByChats/{personId}:
 *  post:
 *      security:
 *       - bearerAuth: []  
 *      tags: 
 *          - Persons
 *      summary: Get every person that has a chat in common with a given array of chats. The array are all the chats of a specific user 
 *      parameters:
 *       -  name: personId
 *          in: path
 *          description: Id of the person who is searching his chats
 *          required: true
 *          schema:
 *              type: number
 *          example: 4
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Chat'
 *      responses:
 *          200:
 *              description: Array of persons  
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Person'
 */
personRouter.post('/getPersonByChats/:personId', async (req: Request & {auth: any}, res: Response) => {
    try {
        const chats: Chat[] = req.body;
        const personId: number = parseInt(req.params.personId);
        const persons = await personService.getPersonByChats(chats, personId)
        res.status(200).json(persons)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})


/**
 * @swagger 
 * /api/persons:
 *  get:
 *      security:
 *       - bearerAuth: [] 
 *      tags: 
 *          - Persons
 *      summary: Find all persons
 *      responses:
 *          200:
 *              description: Got every persons
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Person'
 */
personRouter.get('/', async (req: Request & {auth: any}, res: Response) => {
    try {
        const {role} = req.auth
        const persons = await personService.getAllPersons(role)
        res.status(200).json(persons)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger 
 * /api/persons/addPerson:
 *  post:
 *      security:
 *       - bearerAuth: [] 
 *      tags: 
 *          - Persons
 *      summary: Create a new person 
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/PersonInput'
 *      responses:
 *          200:
 *              description: The person has been created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
personRouter.post('/addPerson', async (req: Request & {auth: any}, res: Response) => {
    try {
        const person = <PersonInput>req.body;
        const result = await personService.addPerson(person);
        res.status(200).json(result)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger 
 * /api/persons/linkPersonToChat/{personId}/{chatId}:
 *  put:
 *      security:
 *       - bearerAuth: [] 
 *      tags: 
 *          - Persons
 *      summary: Link a chat to a person
 *      parameters:
 *       -  name: personId
 *          in: path
 *          description: Id of the person 
 *          required: true
 *          schema:
 *              type: number
 *          example: 4
 *       -  name: chatId
 *          in: path
 *          description: Id of the chat 
 *          required: true
 *          schema:
 *              type: number
 *          example: 4
 *      responses:
 *          200:
 *              description: The chat has been linked
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Person'
 */
personRouter.put('/linkPersonToChat/:personId/:chatId', async (req: Request & {auth: any}, res: Response) => {
    try {
        const personId: number = parseInt(req.params.personId);
        const chatId: number = parseInt(req.params.chatId);
        const result = await personService.linkPersonToChat(personId, chatId);
        res.status(200).json(result)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})



export default personRouter;