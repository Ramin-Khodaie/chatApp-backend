import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import authRouter from './routes/auth';
import chatRouter from './routes/chat';
import enviroment from 'dotenv';
import path from 'path'
import connectDB from './database/db';

const app = express();

const corsOptions = {
    credentials: true,
    origin: true,
}

app.use(cors(corsOptions));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

enviroment.config({
    path: path.join(__dirname, './config/.env')
});



app.use('/api/v1/auth',
    authRouter)
app.use('/api/v1/chat',
    chatRouter)


const httpServer = http.createServer(app)

connectDB()

httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})        