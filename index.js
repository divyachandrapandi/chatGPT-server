
import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = Express();
env.config();

app.use(cors());
app.use(bodyParser.json());

//configure the open ai
// 1. login to openai.com -> goto api -> go to api key
// 2. generate new key
// 3. got to setting > get organization name

const configuration = new Configuration({
  organization: "org-PhdDe43wNRC1q8sIISpsj8NB",
  apiKey: process.env.API_KEY,
});

// open ai connection
const openai = new OpenAIApi(configuration);

app.listen("3080", () => {
  console.log("Server running on Port 3080");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", async(req,res) => {
    const {message} = req.body;
    try {
        const response = await openai.createCompletion({
            model: "gpt-3.5-turbo-instruct",
            prompt: `${message}`,
            max_tokens:100,
            temperature: 0.5,
        })
        // res.json({message: response.data})
        res.json({message: response.data.choices[0].text})
    } catch(err) {
        console.log(err);
        res.send(err).status(400)
    }
}) 