const express = require('express')
const fs = require('fs')
const request = require('request')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('', (req, res) => {
    res.sendFile(__dirname + `/index.html`)
})

app.get('/chatbot', (req, res) => {
    res.sendFile(__dirname + `/chatbot.html`)
})

app.post('/download', (req, res) => {
    let imageUrl = req.body.imageUrl
    let filename = `${__dirname}/img/${req.body.name}.png`

    console.log(`${req.body.name} : ${req.body.imageUrl}`)

    request(imageUrl).pipe(fs.createWriteStream(filename)).on('close', () => {
        console.log("done")
        res.send("return")
    })

    // request(imageUrl, function (error, response, body) {
    //     let image = new Buffer(body, 'binary');
    //     console.log(image)
    // })
    // res.send("test")

})


app.listen(3000, () => {
    console.log("Run")
})