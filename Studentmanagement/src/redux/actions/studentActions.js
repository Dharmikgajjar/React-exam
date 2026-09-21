export const FETCH_STUDENTS_REQUEST = "FETCH_STUDENTS_REQUEST";
export const FETCH_STUDENTS_SUCCESS = "FETCH_STUDENTS_SUCCESS";
export const FETCH_STUDENTS_FAILURE = "FETCH_STUDENTS_FAILURE";
export const ADD_STUDENT_SUCCESS = "ADD_STUDENT_SUCCESS";
export const UPDATE_STUDENT_SUCCESS = "UPDATE_STUDENT_SUCCESS";
export const DELETE_STUDENT_SUCCESS = "DELETE_STUDENT_SUCCESS";

const API_URL = "http://localhost:5000/students";

const fetchStudentsRequest = () => ({ type: FETCH_STUDENTS_REQUEST });
const fetchStudentsSuccess = (students) => ({
  type: FETCH_STUDENTS_SUCCESS,
  savedata: students,
});
const fetchStudentsFailure = (error) => ({
  type: FETCH_STUDENTS_FAILURE,
  savedata: error,
});


export const fetchStudents = () => async (dispatch) => {
  dispatch(fetchStudentsRequest());
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch students");
    const data = await response.json();
    dispatch(fetchStudentsSuccess(data));
  } catch (error) {
    dispatch(fetchStudentsFailure(error.message));
  }
};


export const addStudent = (student) => async (dispatch) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error("Failed to add student");
    const newStudent = await response.json();
    dispatch({ type: ADD_STUDENT_SUCCESS, savedata: newStudent });
    return newStudent;
  } catch (error) {
    dispatch(fetchStudentsFailure(error.message));
  }
};

// PUT /students/:id
export const updateStudent = (id, updatedFields) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });
    if (!response.ok) throw new Error("Failed to update student");
    const updated = await response.json();
    dispatch({ type: UPDATE_STUDENT_SUCCESS, savedata: updated });
    return updated;
  } catch (error) {
    dispatch(fetchStudentsFailure(error.message));
  }
};


export const deleteStudent = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete student");
    dispatch({ type: DELETE_STUDENT_SUCCESS, savedata: id });
  } catch (error) {
    dispatch(fetchStudentsFailure(error.message));
  }
};
