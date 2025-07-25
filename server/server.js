import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDb from './configs/db.js';
import adminRouter from './routes/AdminRoutes.js';
import blogRouter from './routes/BlogRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// connecting to db
await connectDb();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => res.send("API is working"));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

app.listen(PORT, () => console.log(`Server is running on the port: ${PORT}`));

export default app;