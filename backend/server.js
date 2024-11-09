import express from "express";
// import cors from 'cors';
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express();

// const corsOptions = {
//     origin: 'http://localhost:5173', // Your frontend URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Include cookies and HTTP authentication
// };

// app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log('server started at 5000 port');
});
