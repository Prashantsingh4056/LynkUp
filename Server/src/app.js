import express from "express"
import authRouter from './Routes/auth.routes.js'
import profileRouter from "./Routes/profile.routes.js"
import cors from "cors"

const app = express();

app.get("/" , (req , res) => {
    res.send("Server is running");
})

app.use(express.json());
app.use(cors())


app.use("/api/auth" , authRouter);
app.use("/api/profile", profileRouter);


export default app;