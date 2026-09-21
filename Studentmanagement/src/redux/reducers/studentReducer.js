import {
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  ADD_STUDENT_SUCCESS,
  UPDATE_STUDENT_SUCCESS,
  DELETE_STUDENT_SUCCESS,
} from "../actions/studentActions";

const initialState = {
  loading: false,
  students: [],
  error: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_STUDENTS_SUCCESS:
      return { ...state, loading: false, students: action.savedata };

    case FETCH_STUDENTS_FAILURE:
      return { ...state, loading: false, error: action.savedata };

    case ADD_STUDENT_SUCCESS:
      return { ...state, students: [...state.students, action.savedata] };

    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.map((s) =>
          s.id === action.savedata.id ? { ...s, ...action.savedata } : s
        ),
      };

    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.filter((s) => s.id !== action.savedata),
      };

    default:
      return state;
  }
};

export default studentReducer;
