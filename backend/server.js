import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
dotenv.config();
console.log("DEBUG ENV KEY:", process.env.OPENAI_API_KEY);
connectDB();
const app=express();
app.use(cors()); app.use(express.json());
app.use("/auth", authRoutes); app.use("/ai", aiRoutes);
app.get("/check",authMiddleware,(req,res)=>
    { res.json({message:"Auth valid",userId:req.user.userId});
});
app.get("/",(req,res)=>res.send("Career Guidance API running"));
const PORT=process.env.PORT||5000; app.listen(PORT,()=>console.log("Server running",PORT));
console.log("OpenAI Key:", process.env.OPENAI_API_KEY ? "Loaded" : "Missing");