import 'module-alias/register'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import contentLength from 'express-content-length-validator'
import { todos } from './todo'

const MAX_CONTENT_LENGTH_ACCEPTED = 9999

const app = express()

app.use(cors())
app.use(contentLength.validateMax({ max: MAX_CONTENT_LENGTH_ACCEPTED }))
app.use(hpp())
app.use(helmet())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(todos)

const { APP_PORT } = process.env
app.listen(APP_PORT, () => {
  console.log(`Server running at port ${APP_PORT}`)
})
