import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import gptResponse from '../services/gptServices.js';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const gptRoute = express.Router()

gptRoute.get('/ask', async(req, res) => {
    try{
        console.log(OPENAI_API_KEY);
        const userText = 'I just break up with my boyfriend, give me a song to listen';
        const prompt1 = `extract feelings keyword from this text, put it into json file: ${userText}`;

        const feelingsResponse = await gptResponse(prompt1);
        const feelings = JSON.parse(feelingsResponse);

        const prompt2 = `recommend 5 songs from USUK for ${feelings}, return song name and artist name in json format`;
        const songsResponse = await gptResponse(prompt2);
        const songs = JSON.parse(songsResponse);
        console.log(songs);

        const data = {
            ...feelings,
            ...songs
        }
        console.log(data);

        res.status(200).send(data);
    }catch(err){
        console.log(err);
        return res.status(501).send(("server error roi", err));
    }   
});

export default gptRoute;