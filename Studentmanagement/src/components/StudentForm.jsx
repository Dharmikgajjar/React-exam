import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  updateStudent,
  fetchStudents,
} from "../redux/actions/studentActions";

const emptyForm = {
  name: "",
  grade: "",
  subject: "",
  marks: "",
  totalMarks: 100,
  examType: "Class Exam",
  phone: "",
  email: "",
  age: "",
  image: "",
};

const StudentForm = ({ studentId, onDone }) => {
  const id = studentId;
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.studentData);

  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const existing = students.find((s) => s.id === id);
      if (existing) {
        setForm(existing);
      } else {
        dispatch(fetchStudents());
      }
    }
  }, [isEdit, id, students, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const savedata = {
      ...form,
      marks: Number(form.marks),
      totalMarks: Number(form.totalMarks) || 100,
      age: form.age ? Number(form.age) : undefined,
      image:
        form.image ||
        ""
    };

    if (isEdit) {
      await dispatch(updateStudent(id, savedata));
    } else {
      await dispatch(addStudent(savedata));
    }
    setSubmitting(false);
    onDone?.();
  };

  return (
    <div className="container py-4" style={{ maxWidth: 640 }}>
      <div className="card shadow-sm p-4">
        <h4 className="mb-4" style={{ color: "#efedf2" }}>
          {isEdit ? "Edit Student Record" : "Add New Student Record"}
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Student's Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Standard / Class</label>
              <input
                className="form-control"
                name="std"
                value={form.std}
                onChange={handleChange}
                placeholder="e.g. standard 10th"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Subject</label>
              <select
                className="form-select"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select subject</option>
                <option>Science</option>
                <option>Maths</option>
                <option>English Literature</option>
                <option>English Grammar</option>
                <option>Environmental Studies</option>
                <option>Hindi</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Marks Scored</label>
              <input
                type="number"
                className="form-control"
                name="marks"
                value={form.marks}
                onChange={handleChange}
                min="0"
                max="100"
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Out of</label>
              <input
                type="number"
                className="form-control"
                name="totalMarks"
                value={form.totalMarks}
                onChange={handleChange}
                min="1"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Type of Exam</label>
              <select
                className="form-select"
                name="examType"
                value={form.examType}
                onChange={handleChange}
              >
                <option>Class Exam</option>
                <option>Online Exam</option>
                <option>Missed Exam</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={form.age}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Photo URL</label>
              <input
                className="form-control"
                name="image"
                value={form.image}
                onChange={handleChange}
                
              />
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            <button
              type="submit"
              className="btn text-white"
              style={{ background: "#200278" }}
              disabled={submitting}
            >
              {submitting ? "Saving..." : isEdit ? "Update Record" : "Add Now"}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => onDone?.()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
