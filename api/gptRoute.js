import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const gptRoute = express.Router()

gptRoute.post('/ask', async(req, res) => {
    try{
        console.log(OPENAI_API_KEY);
        const prompt = `tell me a joke`;

        const response  = await axios.post('https://api.openai.com/v1/chat/completions',{
            model: "gpt-3.5-turbo",
            messages:[{role: "user", content: prompt}],
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        })

        const responseData = response.data;
        res.status(200).send({analysis: responseData.choices[0]?.message?.content});
    }catch(err){
        //console.log(err);
        return res.status(501).send(("server error roi", err));
    }   
});

export default gptRoute;