import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "../redux/actions/studentActions";

const examBadgeColor = (type) => {
  if (type === "Missed Exam") return "text-danger";
  if (type === "Online Exam") return "text-primary";
  return "text-success";
};

const StudentDetails = ({ student, onEdit }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleDelete = () => {
    if (window.confirm(`Remove ${student.name}'s ${student.subject} record?`)) {
      dispatch(deleteStudent(student.id));
    }
  };

  return (
    <tr>
      <td className="d-flex align-items-center gap-2 py-3">
        <img
          src={student.image || ""}
          alt={student.name}
          className="rounded-circle"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
        <div>
          <div className="fw-semibold" style={{ color: "#3A2E6E" }}>
            {student.name}
          </div>
          <div className="text-muted small">{student.grade || student.std}</div>
        </div>
      </td>
      <td className="align-middle text-muted">{student.subject}</td>
      <td className="align-middle">
        {student.marks} / {student.totalMarks}
      </td>
      <td
        className={`align-middle fw-semibold ${examBadgeColor(student.examType)}`}
      >
        {student.examType}
      </td>
      <td className="align-middle text-end pe-3">
        
        {isAuthenticated && (
          <div className="btn-group btn-group-sm">
            <button
              className="btn  btn-link btn-sm text-decoration-none text- me-1"
              onClick={() => onEdit?.(student.id)}
              title="Edit Record"
            >
              <i className="fa-solid fa-pen me-1"></i> Edit
            </button>
            <button
              className="btn btn-link btn-sm text-decoration-none text-danger  btn-sm"
              onClick={handleDelete}
              title="Delete Record"
            >
              <i className="fa-solid fa-trash me-1"></i> Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default StudentDetails;
