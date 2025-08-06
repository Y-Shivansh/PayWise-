const express = require("express");
const cors = require("cors")
const mainRouter= require("./routes/index")

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:5174", "http://localhost:5173", "https://pay-wise-teal.vercel.app"]
app.use(cors(allowedOrigins))
app.use("/api/v1", mainRouter)

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "UP"
    })
})

app.listen(3000,()=>{
    console.log("server running");
})