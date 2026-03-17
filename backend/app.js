const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connection = require('./config/db');
const PORT = process.env.PORT || 8000;
const userRouter = require('./routes/userRoute');
const jobRouter = require('./routes/jobRoute');
const applicationRouter = require('./routes/applicationRoute');

const app = express();

// app.use(cors());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use('/user', userRouter);
app.use('/job', jobRouter);
app.use('/application', applicationRouter);

app.get('/', (req, res) => {
    try {
        res.send("Welcome to Job Portal API");
        
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(PORT, async() => {
     try {
        await connection;
        console.log(`Server is running on port ${PORT} and DB is also connected`);
     } catch (error) {
        console.error('Error starting server:', error);
     }
});

module.exports = app;