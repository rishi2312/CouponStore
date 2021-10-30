import express from "express";
import mongoose from "mongoose";
import couponRoutes from "./routes/couponRoutes.js";
import updateExpired from "./scheduler/expiredUpdateScheduler.js";
import cron from 'node-cron'

const DB_CONNECT_STRING = // mongo db connection url
  "mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.lkcul.mongodb.net/MyDatabase?retryWrites=true&w=majority&ssl=true";
const PORT = 8081;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


cron.schedule('0 */8 * * *', () => updateExpired())                                   //Scheduler to run a job to check whether any exired coupon is Active or not

mongoose.connect(DB_CONNECT_STRING, { useNewUrlParser: true }, () => {
  console.log("Connected to database");                                               // Database Connection
});

app.use("/coupons", couponRoutes);                                                    // Using couponRoutes to route the end points like "http://localhost:8091/coupons"

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

