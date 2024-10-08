import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.post('/sum', (req, res) => {
    const a = parseInt(req.body.a)
    const b = parseInt(req.body.b)

    res.json(a + b)
})


app.listen(3000)