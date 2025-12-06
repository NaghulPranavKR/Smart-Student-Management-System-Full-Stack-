import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

interface Student {
  name: string;
  rollNo: string;
  attendance: number;
  marks: number;
}

const AddStudentPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Student>({
    name: '',
    rollNo: '',
    attendance: 0,
    marks: 0,
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === 'attendance' || e.target.name === 'marks'
        ? Number(e.target.value)
        : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/students', form);
      setForm({ name: '', rollNo: '', attendance: 0, marks: 0 });
      toast.success('Student added successfully!');
      navigate('/view-students');
    } catch (err) {
      console.error('Error adding student:', err);
      toast.error('Failed to add student.');
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add Student Information</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="rollNo"
          placeholder="Roll No"
          value={form.rollNo}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="attendance"
          placeholder="Enter Attendance Percentage"
          value={form.attendance || ''}
          onChange={handleChange}
          required
          min={0}
          max={100}
        />
        <input
          type="number"
          name="marks"
          placeholder="Enter Marks Percentage"
          value={form.marks || ''}
          onChange={handleChange}
          required
          min={0}
          max={100}
        />
        <button type="submit">Add Student</button>
      </form>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AddStudentPage;
