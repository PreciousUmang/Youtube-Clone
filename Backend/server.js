import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './Routes/userRoutes.js';
import videoRoutes from './Routes/videoRoutes.js';
import channelRoutes from './Routes/channelRoutes.js'
import commentRoutes from './Routes/commentRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.listen('5000', ()=>{
    console.log('Server is running on 5000')
})
// Middleware
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', videoRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api', commentRoutes);

const uri = 'mongodb://localhost:27017/youtubeCloneDB'; 

mongoose.connect(uri)
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection failed:', error));