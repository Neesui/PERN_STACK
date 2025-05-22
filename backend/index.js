import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import prisma from "./config/db.config.js";
import userRoute from "./routes/userRoutes.js";


// port
const port = process.env.PORT;

const app = express();
// morgan
app.use(morgan("dev"));

// cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Cookie parser middleware
app.use(cookieParser());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// morgan
app.use(morgan("dev"));

// routes
app.use("/api/user", userRoute);

app.use(function(req,res){
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const __dirname = path.resolve(); // set __dirname to current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

  app.get("/", (req, res) => {
    res.send("API is running....");
  });


const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("1. Database connected successfully!");

    app.listen(port, () => {
      console.log(`2. Server is running on PORT ${port}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

startServer();