import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRouter from './controller/user.routes';
import personsRouter from './controller/person.routes';
import messagesRouter from './controller/message.routes';
import chatRouter from './controller/chat.routes';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

const app = express();
app.use(helmet());
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             connectSrc: ['self', 'https://api.ucll.be'],
//         },
//     })
// );

dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});


app.use(
    expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
    }).unless({
    path: ['/api-docs', /^\/api-docs\/.*/, '/api/users/login', '/api/users/signup','/api/users', '/api/status', '/status'],
    })
);


app.use('/api/users', userRouter);
app.use('/api/persons', personsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/chats', chatRouter);


const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Chatbox API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts']
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({status: 'application error', message: err.message})
    }
    else{
        res.status(400).json({status: 'application error', message: err.message})
    }
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
