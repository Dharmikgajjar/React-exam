import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/actions/studentActions";
import StudentDetails from "./StudentDetails";

const StudentList = ({ onAdd, onEdit }) => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector(
    (state) => state.studentData,
  );
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [sortKey, setSortKey] = useState("name");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const subjects = useMemo(
    () => [...new Set(students.map((s) => s.subject))],
    [students],
  );

  const filtered = useMemo(() => {
    let list = [...students];

    if (activeTab !== "All") {
      list = list.filter((s) => s.examType === activeTab);
    }
    if (subjectFilter) {
      list = list.filter((s) => s.subject === subjectFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      if (sortKey === "marks") return b.marks - a.marks;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [students, activeTab, subjectFilter, search, sortKey]);

  const uniqueStudentCount = new Set(students.map((s) => s.name)).size;
  const uniqueSubjectCount = subjects.length;

  const tabs = ["All", "Class Exam", "Online Exam", "Missed Exam"];

  return (
    <div
      className="container-fluid py-4 px-4"
      style={{ background: "#F4F2FB", minHeight: "100vh" }}
    >
      <div className="card border-0 shadow-sm overflow-hidden">
        
        <div
          className="p-4"
          style={{
            background:
              "linear-gradient(90deg, rgba(252, 0, 13, 1) 0%, rgba(247, 106, 106, 0.94) 100%)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex align-items-center gap-3">
              <img
                src={
                  user?.image ||
                  "https://tse1.mm.bing.net/th/id/OIP._ghhpcabJS3cvS31T-DPdAHaHC?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                }
                alt="Education"
                className="rounded-circle"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  border: "3px solid #fff",
                }}
              />
              <div className="text-white">
                <h4 className="mb-0 fw-bold">{user?.name || ""}</h4>
                <div className="small opacity-75">{user?.school || ""}</div>
              </div>
            </div>
            <div className="d-flex gap-4 text-white text-center mt-3 mt-lg-0">
              <div>
                <div className="fs-4 fw-bold">{uniqueStudentCount}</div>
                <div className="small opacity-75">Students</div>
              </div>
              <div>
                <div className="fs-4 fw-bold">{uniqueSubjectCount}</div>
                <div className="small opacity-75">Subjects</div>
              </div>
              <div>
                <div className="fs-4 fw-bold">{students.length}</div>
                <div className="small opacity-75">Exams</div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="p-3 bg-white border-bottom d-flex flex-wrap gap-3 align-items-end">
          <div>
            <label className="form-label small text-muted mb-1">Subject</label>
            <select
              className="form-select form-select-sm"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              style={{ minWidth: 160 }}
            >
              <option value="">All subjects</option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label small text-muted mb-1">Sort by</label>
            <select
              className="form-select form-select-sm"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              style={{ minWidth: 140 }}
            >
              <option value="name">Name</option>
              <option value="marks">Marks Scored</option>
            </select>
          </div>
          {isAuthenticated && (
            <button
              className="btn text-white ms-auto"
              style={{ background: "#160143" }}
              onClick={onAdd}
            >
              + Add Now
            </button>
          )}
        </div>

       
        <div className="p-3 d-flex justify-content-between align-items-center flex-wrap gap-2 bg-white">
          <div className="d-flex gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                className="btn btn-sm"
                style={{
                  color: activeTab === tab ? "#6C3FCB" : "#888",
                  fontWeight: activeTab === tab ? 600 : 400,
                  border: "none",
                  background: "transparent",
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder="Search by name..."
            style={{ maxWidth: 220 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        
        <div className="table-responsive bg-white">
          <table className="table align-middle mb-0">
            <thead>
              <tr className="text-muted small">
                <th className="ps-3">Name</th>
                <th>Subject</th>
                <th>Marks Scored</th>
                <th>Type of Exam</th>
                <th className="text-end pe-4">
                  {isAuthenticated ? "Actions" : ""}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    Loading students...
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-danger">
                    {error} — is json-server running on port 5000?
                  </td>
                </tr>
              )}
              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No records found.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                filtered.map((student) => (
                  <StudentDetails
                    key={student.id}
                    student={student}
                    onEdit={onEdit}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
