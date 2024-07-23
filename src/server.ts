import express, { Application } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express()
const PORT: string | number = process.env.PORT || 3000

app.use(express.json())

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
})
