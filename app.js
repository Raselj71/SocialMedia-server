import express from "express";
import router from './route.js';
import cors from 'cors';
import http from 'http';

const app = express();

import { Server } from 'socket.io';
const server = http.createServer(app);


const io = new Server(server, { cors: { origin: '*' } });


import setupSocket from  './socket.js';
setupSocket(io)



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);



export default server;
