const cohere = require('cohere-ai')
require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

COHERE_KEY = process.env.COHERE_KEY
cohere.init('{COHERE_KEY}');

app.get("/", async(req,res) => {
    res.send("hello Mailo")
});

app.post('/generate', async (req, res) => {
    try {
      const response = await cohere.generate({
        model: 'command-xlarge-nightly',
        prompt: 'Write a cold outreach email introducing myself as Susan to the hr to apply 5 day leave.',
        max_tokens: 300,
        temperature: 0.9,
        k: 0,
        p: 0.75,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE'
      });
      console.log(`Prediction: ${response.body.generations[0].text}`);
  
      res.send({
        success: true,
        message: response.body.generations[0].text
      });
    } catch (error) {
      res.send({
        success: false,
        message: error
      });
    }
  });
  


 app.listen(8000, () => {
     console.log('Server is running on port 8000')
 })