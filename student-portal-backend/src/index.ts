import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Create Express app
const app = express();

// Middleware
app.use(cors());            // allow frontend to access backend
app.use(express.json());    // parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/student_portal')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define Student schema & model
interface IStudent extends mongoose.Document {
  name: string;
  rollNo: string;
  attendance: number;
  marks: number;
}

const studentSchema = new mongoose.Schema<IStudent>({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  attendance: { type: Number, required: true },
  marks: { type: Number, required: true }
});

const Student = mongoose.model<IStudent>('Student', studentSchema);

// --- CRUD API routes ---

// Get all students
app.get('/students', async (_req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Create student
app.post('/students', async (req: Request, res: Response) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Update student
app.put('/students/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Delete student
app.delete('/students/:id', async (req: Request, res: Response) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
