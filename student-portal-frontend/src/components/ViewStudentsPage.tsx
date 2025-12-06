import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../api/axios';

interface Student {
  _id?: string;
  name: string;
  rollNo: string;
  attendance: number;
  marks: number;
}

const ViewStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');



  const fetchStudents = async () => {
    try {
      const res = await axios.get('/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
      toast.error('Failed to fetch students.');
    }
  };

  const handleUpdate = async (student: Student) => {
    const updatedName = prompt('Enter new name:', student.name);
    const updatedRollNo = prompt('Enter new roll number:', student.rollNo);
    const updatedAttendance = prompt('Enter new attendance %:', student.attendance.toString());
    const updatedMarks = prompt('Enter new marks %:', student.marks.toString());

    if (updatedName && updatedRollNo && updatedAttendance && updatedMarks) {
      try {
        await axios.put(`/students/${student._id}`, {
          name: updatedName,
          rollNo: updatedRollNo,
          attendance: Number(updatedAttendance),
          marks: Number(updatedMarks),
        });
        toast.success('Student updated successfully!');
        fetchStudents();
      } catch (err) {
        console.error('Error updating student:', err);
        toast.error('Failed to update student.');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`/students/${id}`);
        toast.success('Student deleted successfully!');
        fetchStudents();
      } catch (err) {
        console.error('Error deleting student:', err);
        toast.error('Failed to delete student.');
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    let aValue: any = a[sortBy as keyof Student];
    let bValue: any = b[sortBy as keyof Student];

    if (sortBy === 'name' || sortBy === 'rollNo') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Calculate statistics
  const passedStudents = students.filter(s => s.marks >= 40).length;
  const passPercentage = students.length > 0 ? ((passedStudents / students.length) * 100).toFixed(2) : 0;
  const avgAttendance = students.length > 0 ? (students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(1) : 0;
  const avgMarks = students.length > 0 ? (students.reduce((sum, s) => sum + s.marks, 0) / students.length).toFixed(1) : 0;

  // Data for bar chart (attendance)
  const attendanceData = students.slice(0, 10).map(s => ({ name: s.name.split(' ')[0], attendance: s.attendance }));

  // Data for pie chart (pass/fail)
  const pieData = [
    { name: 'Passed', value: passedStudents, color: '#28a745' },
    { name: 'Failed', value: students.length - passedStudents, color: '#dc3545' },
  ];

  // Data for marks distribution
  const marksData = students.map(s => ({ name: s.name.split(' ')[0], marks: s.marks }));

  return (
    <div className="view-students-container">
      <div className="page-header" style={{ padding: '2rem' }}>
        <h2>Student Analytics Dashboard</h2>
        <p>Comprehensive insights into student performance and attendance</p>
      </div>

      <div className="search-and-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filters">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort students by">
            <option value="name">Sort by Name</option>
            <option value="rollNo">Sort by Roll No</option>
            <option value="attendance">Sort by Attendance</option>
            <option value="marks">Sort by Marks</option>
          </select>
          <button
            className="sort-toggle"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Students</h3>
            <p className="stat-number">{students.length}</p>
          </div>
        </div>
        <div className="stat-card pass-rate">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Pass Rate</h3>
            <p className="stat-number">{passPercentage}%</p>
          </div>
        </div>
        <div className="stat-card attendance">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Avg Attendance</h3>
            <p className="stat-number">{avgAttendance}%</p>
          </div>
        </div>
        <div className="stat-card marks">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>Avg Marks</h3>
            <p className="stat-number">{avgMarks}</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-header">
            <h3>Attendance Overview</h3>
            <p>Individual student attendance percentages</p>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#6a11cb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3>Pass/Fail Distribution</h3>
            <p>Overall performance breakdown</p>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3>Marks Distribution</h3>
            <p>Individual student marks overview</p>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marksData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="marks" stroke="#2575fc" strokeWidth={3} dot={{ fill: '#2575fc', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="students-table-section">
        <div className="table-header">
          <h3>Student Records</h3>
          <p>Showing {filteredStudents.length} of {students.length} students</p>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Attendance</th>
                <th>Marks</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td className="student-name">{student.name}</td>
                    <td className="roll-no">{student.rollNo}</td>
                    <td>
                      <div className="attendance-cell">
                        <span
                          className={
                            student.attendance > 75
                              ? 'status-badge status-excellent'
                              : student.attendance > 60
                              ? 'status-badge status-good'
                              : student.attendance > 40
                              ? 'status-badge status-average'
                              : 'status-badge status-poor'
                          }
                        >
                          {student.attendance}%
                        </span>
                      </div>
                    </td>
                    <td className="marks-cell">{student.marks}</td>
                    <td>
                      <span className={`result-badge ${student.marks >= 40 ? 'pass' : 'fail'}`}>
                        {student.marks >= 40 ? 'Pass' : 'Fail'}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn update-btn" onClick={() => handleUpdate(student)}>Update</button>
                      <button className="action-btn delete-btn" onClick={() => handleDelete(student._id!)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-data">No students found matching your search</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ViewStudentsPage;
