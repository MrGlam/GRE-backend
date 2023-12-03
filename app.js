const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { connectToDatabase, disconnectFromDatabase } = require("./config/db.js");
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');


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

connectToDatabase()

// Routes

app.use('/users', userRoutes);
app.use('/courses', courseRoutes);




process.on('SIGINT', async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectFromDatabase();
  process.exit(0);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors());
