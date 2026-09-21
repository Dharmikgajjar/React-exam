import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import Login from "./components/Login";
import { loadUserFromStorage } from "./redux/actions/authActions";


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [view, setView] = useState("list");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

 
  useEffect(() => {
    if ((view === "add" || view === "edit") && !isAuthenticated) {
      setView("login");
    }
  }, [view, isAuthenticated]);

  const goToList = () => {
    setEditId(null);
    setView("list");
  };

  const goToAdd = () => setView(isAuthenticated ? "add" : "login");

  const goToEdit = (id) => {
    setEditId(id);
    setView(isAuthenticated ? "edit" : "login");
  };

  const goToLogin = () => setView("login");

  return (
    <>
      <Navbar view={view} onNavigateHome={goToList} onNavigateAdd={goToAdd} onNavigateLogin={goToLogin} />

      {view === "login" && <Login onSuccess={goToList} />}

      {view === "list" && <StudentList onAdd={goToAdd} onEdit={goToEdit} />}

      {(view === "add" || view === "edit") && isAuthenticated && (
        <StudentForm studentId={view === "edit" ? editId : null} onDone={goToList} />
      )}
    </>
  );
}

export default App;
