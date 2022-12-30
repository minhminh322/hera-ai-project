import express from 'express'
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", async(req, res) => {
    res.status(200).send({
        message: "Hello world"
    })
})

app.post('/', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`, 
            temperature: 0.7,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
        // await PromiseTimeout(3000);
        res.status(200).send({
            bot: response.data.choices[0].text
            // bot: "1. Học bằng phương pháp học thông minh: Tìm hiểu về các từ vựng, cấu trúc ngữ pháp và phát âm tiếng Anh trước khi bắt đầu học.\n\n2. Sử dụng phương pháp học tập trung vào luyện tập cấu trúc câu và phát âm.\n\n3. Tập luyện v"
          })
    } catch (error) {
        res.status(500).send({error})
    }
})

app.listen(5050, () => console.log("Server is running on port http://localhost:5050"))
