require("dotenv/config")
const express = require("express")
const cors = require("cors");
const nodemailer = require("nodemailer")
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000
const app = express();


app.use(cors())

app.use(bodyParser.json())

app.post('/send-message', (req, res) => {
    const {name, email, message} = req.body

    if (!name || !email || !message) {
        res.status(400).json({message: "Fields are Empty"})
    }

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: `Message from ${name}`,
        text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString())
        }
        res.status(200).send('Message sent successfully')
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

