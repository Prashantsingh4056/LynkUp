import  "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

const PORT = process.env.PORT || 3000;


// === ADD THIS TEMPORARY DIAGNOSTIC BLOCK ===
// console.log("--- SYSTEM ENVIRONMENT CHECK ---");
// console.log("Current Working Directory:", process.cwd());
// console.log("MAIL_USER value:", process.env.MAIL_USER || "❌ UNDEFINED");
// console.log("MAIL_PASS value:", process.env.MAIL_PASS ? "✅ LOADED" : "❌ UNDEFINED");
// console.log("--------------------------------");

connectDB();

app.listen(PORT , () => {
    console.log(`Server is running on Port ${PORT}`);
    
})