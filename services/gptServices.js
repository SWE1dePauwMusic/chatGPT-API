import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export default async function gptResponse(prompt){
    try{
        const response  = await axios.post('https://api.openai.com/v1/chat/completions',{
            model: "gpt-3.5-turbo",
            messages:[{role: "user", content: prompt}],
            temperature: 0.1,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        })

        const responseData = response.data;
        return responseData.choices[0]?.message?.content;
    }catch(err){
        return err;
    }   
}