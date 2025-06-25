import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import cors from 'cors';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5175;


app.use(express.json());
app.use(cors());


app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
