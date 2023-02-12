const cohere = require('cohere-ai')
const express = require('express')
const app = express()

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

cohere.init('M8A9xH7mdqfu9qA1fKVi1jsTYlADKDNRO6df7Lxv');

app.get("/", async(req,res) => {
    res.send("hello Mailo")
});

app.post('/generate', async (req,res) =>{
try {
    const response = await cohere.generate({
        model: 'command-xlarge-20221108',
        prompt: req.body.prompt,
        max_tokens: 200,
        temperature: 0.9,
        k: 0,
        p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE'
    });
    console.log("response",response, "completion:",response.body.generations[0].text)
    res.send({
        success: true,
        message: response.body.generations[0].text
        });
    } catch (error) {
        res.send({
        success: false,
        message: error.message
        });
    }
    
});


 app.listen(8000, () => {
     console.log('Server is running on port 8000')
 })