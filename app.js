const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { connectToDatabase, disconnectFromDatabase } = require("./config/db.js");
const User = require('./models/userModel.js');


app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: 'Hello, Express!' }));
});
app.use(express.json());



// Routes
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/courses', courseRoutes);
app.use('/auth', authRoutes);
connectToDatabase()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors());
