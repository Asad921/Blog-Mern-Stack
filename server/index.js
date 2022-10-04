import  express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Router from './routes/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/',Router);

const Port = 8000;

dotenv.config();

// conect to mongo db

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true

    }, () => console.log("connected to db")
);

app.listen(Port, ()=> console.log('Server is up'));