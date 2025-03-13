import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import "colors"
import morgan from "morgan";
import path from "path";

import connectDB from "./src/utils/db.js";
import userRoute from "./src/routes/user.route.js";
import companyRoute from "./src/routes/company.route.js";
import jobRoute from "./src/routes/job.route.js";
import applicationRoute from "./src/routes/application.route.js";

dotenv.config({});

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:[process.env.ORIGIN],
    credentials:true
}

app.use(cors(corsOptions));
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);



app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`.bgMagenta.white);
})