import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5745e7230d80da",
      pass: "139abe41444074"
    }
  });

app.post('/feedbacks', async (req, res) => {
    const { type, commment, screenshot } = req.body
    const feedback = await prisma.feedback.create({
        data:{
            type,
            commment,
            screenshot
        }
    })
    transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'João Pedro <jjoao.monteiro15@gmail.com>',
        subject: 'Novo Feedback',
        html: [
            '<div style="font-family: sans-serif">',
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentario: ${commment}</p>`,
            '</div>'
        ].join('/n')
    })
    return res.status(201).json({data: feedback})
})

// 53:27

app.listen(3333, ()=>{
    console.log('HTTP server running!');
    
})