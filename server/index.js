import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

//we can use express middleware to connect postRoutes to our app

app.use(bodyParser.json({ limit: '30mb', extended: true })) ///some images can be large in size
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))// we are setting up bodyparser so that we can send our requests
app.use(cors());

app.use('/posts', postRoutes); /// every route in postroutes is going to start with /posts

app.get('/', (req, res)=>{//greeting route if we visit our app
    res.send('Hello to Memories API');
});

//const CONNECTION_URL='mongodb+srv://username@cluster0.mgceg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';//stored in .env for security reasons
const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})// connect to database
    .then(()=> app.listen(PORT, ()=> console.log(`Sever running on port: ${PORT}`)))//successfull
    .catch((error) => console.log(error.message));// not success

mongoose.set('useFindAndModify', false);// so we dont get any warnings in console

// https://wwww.mongodb.com/cloud/atlas