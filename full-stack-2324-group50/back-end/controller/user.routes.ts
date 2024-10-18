/**
 * @swagger 
 *  components:
 *   securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *   schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *            example: 4
 *          rnummer: 
 *            type: string
 *            description: R-nummer van de user
 *            example: "r0886633"
 *          password:
 *            type: string
 *            description: Wachtwoord van de user
 *            example: "admin123" 
 *          email:
 *            type: string
 *            description: Email van de user
 *            example: "Admin@ucll.be"  
 *          role:
 *            type: string
 *            description: Role van de user
 *            enum:
 *              - Admin
 *              - User
 *            example: "Admin"
 *          person:
 *            $ref: '#/components/schemas/Person'  
 *      UserInput:
 *        type: object
 *        properties:
 *          rnummer: 
 *            type: string
 *            description: R-nummer van de user
 *            example: "r0664422"
 *          password:
 *            type: string
 *            description: Wachtwoord van de user
 *            example: "kevin123" 
 *          email:
 *            type: string
 *            description: Email van de user 
 *            example: "kevin@ucll.be"
 *          role:
 *            type: string
 *            description: Rol van de user, Admin of User 
 *            example: "User"  
 *      AuthenticationRequest:
 *        type: object
 *        properties:
 *          rnummer: 
 *            type: string
 *            description: R-nummer van de user
 *            example: "r0886633"
 *          password:
 *            type: string
 *            description: Wachtwoord van de user
 *            example: "admin123"
 *      AuthenticationResponse:
 *        type: object
 *        properties:
 *          message: 
 *            type: string
 *            description: Message of the sucess of authentication
 *            example: "Authentication succesful"
 *          token: 
 *            type: string
 *            description: Valid JWT token
 *            example: "eyJhbGciOiJIU5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36"
 *          rnummer: 
 *            type: string
 *            description: R-nummer van de user
 *            example: "r0886633"
 *          email:
 *            type: string
 *            description: Email van de user
 *            example: "Admin@ucll.be" 
 *          role:
 *            type: string
 *            description: Role van de user
 *            enum:
 *              - Admin
 *              - User
 *            example: "Admin"
 */

import express, {NextFunction, Request, Response} from "express"
import userService from "../service/user.service"
import { Scheduler } from "timers/promises"
import { User } from "../domain/model/user"
import { UserInput } from "../types"
import messageDb from "../domain/data-access/message.db"

const userRouter = express.Router()

/**
 * @swagger 
 * /api/users/{rNummer}:
 *  get: 
 *      security:
 *       - bearerAuth: []
 *      tags: 
 *          - Users
 *      summary: Find user by rNummer
 *      parameters:
 *       -  name: rNummer
 *          in: path
 *          description: rNumber of the user 
 *          required: true
 *          schema:
 *              type: string
 *          example: "r0886633"
 *      responses:
 *          200:
 *              description: User with the given rnummer has been founded
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
userRouter.get('/:userRnummer', async (req: Request & {auth: any}, res: Response) => {
    try {
        const userRnummer: string = req.params.userRnummer;
        const user = await userService.getUserByRnummer(userRnummer)
        res.status(200).json(user)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger 
 * /api/users/deleteUserAndLinkedPersonAndChatsAndMessagesByRnummer/{rNummer}:
 *  delete: 
 *      security:
 *       - bearerAuth: []
 *      tags: 
 *          - Users
 *      summary: Admin only function delete user by rNummer. Everything that is linked to him will also be deleted (person & chats)
 *      parameters:
 *       -  name: rNummer
 *          in: path
 *          description: rNumber of the user 
 *          required: true
 *          schema:
 *              type: string
 *          example: "r0775522"
 *      responses:
 *          200:
 *              description: User with the given rnummer has been deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
userRouter.delete('/deleteUserAndLinkedPersonAndChatsAndMessagesByRnummer/:userRnummer', async (req: Request & {auth: any}, res: Response) => {
    try {
        const userRnummer: string = req.params.userRnummer;
        const {role} = req.auth
        const user = await userService.deleteUserAndLinkedPersonAndChatsAndMessagesByRnummer(userRnummer, role)
        res.status(200).json(user)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger 
 * /api/users:
 *  get:
 *      tags: 
 *          - Users
 *      summary: Find all users
 *      responses:
 *          200:
 *              description: Got every users
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        // const {role} = req.auth
        const users = await userService.getAllUsers()
        res.status(200).json(users)
    }
    catch(error) {
        res.status(400).json({status: 'error', errorMessage: error.message})
    }
})

/**
 * @swagger 
 * /api/users/signup:
 *  post: 
 *      tags: 
 *          - Users
 *      summary: Create a new user 
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/UserInput'
 *      responses:
 *          200:
 *              description: The user has been created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.addUser(user);
        res.status(200).json(result)
    }
    catch(error) {
        next(error);
    }
})

/**
 * @swagger 
 * /api/users/login:
 *  post: 
 *      tags: 
 *          - Users
 *      summary: Login using r-nummer/password. Returns r-nummer and token
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *          200:
 *              description: The logged user
 *              content:
 *                  application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput); 
        res.status(200).json({message: 'Authentication succesful', ...response});
    }
    catch(error) {
        next(error);
    }
})
export default userRouter;