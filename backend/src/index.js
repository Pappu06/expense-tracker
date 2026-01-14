import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.listen(3000, () => {
  console.log('Server is running on port 3000');});
  
import cors from 'cors';
  app.use(cors({
    origin: process.env.DOMAIN,
    credentials: true,
  }));
//DB Cannection
import mongoose from 'mongoose';
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("DB connected"))
.catch(()=>console.log("DB not connected"));

//App level midlleware
import morgan from "morgan";
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}))


//Route level middleware
import userRouter from './user/user.routes.js';
app.use("/api/user", userRouter);

//Expense routes
import expenseRoutes from "./expense/expense.routes.js";

app.use("/api/expenses", expenseRoutes);
