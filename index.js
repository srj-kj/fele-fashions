import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import productRoutes from "./routes/productRoutes.js";
import cookieParser from 'cookie-parser';
import connectToDatabase from './connection/dataBase.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();



const app = express();
const Port = 3000;
app.use(cors());

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/", productRoutes);
app.all('*',(req,res,next)=>{
  const err = { message: "Not found(Invalid Route)", statusCode: 404 };
  throw err;
})
app.use(errorHandler);
connectToDatabase();

app.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});