import express from 'express'
import diaryRouter from './routes/diaries'
import userRouter from './routes/user'
import categoryRouter from './routes/category';
import courseRouter from './routes/course';
import evidenceRouter from './routes/evidence';
import linkRouter from './routes/link';
import planRouter from './routes/plan';

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
    console.log('someone pinged here!!'+ new Date().toLocaleDateString())
    res.send('pong')
})

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use('/api/user', userRouter)

app.use('/api/category', categoryRouter)

app.use('/api/course', courseRouter)

app.use('/api/evidence', evidenceRouter)

app.use('/api/link', linkRouter)

app.use('/api/plan', planRouter)