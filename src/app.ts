import express from 'express'
import cors from 'cors'
import router from "./routes";
import {errorHandler} from "./middlewares/error-handler";

const app = express()
app.use(cors())
app.use(router)
app.use(errorHandler)
app.listen(8080, () => console.log('Server is running on port 8080'))