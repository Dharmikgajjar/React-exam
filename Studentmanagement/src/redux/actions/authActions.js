export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

const API_URL = "http://localhost:5000/users";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}?email=${email}`);
    const users = await response.json();
    const user = users[0];

    if (user && user.password === password) {
      localStorage.setItem("authUser", JSON.stringify(user));
      dispatch({ type: LOGIN_SUCCESS, savedata: user });
      return { success: true };
    } else {
      dispatch({ type: LOGIN_FAILURE, savedata: "Invalid email or password" });
      return { success: false, message: "Invalid email or password" };
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, savedata: error.message });
    return { success: false, message: error.message };
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("authUser");
  dispatch({ type: LOGOUT });
};

export const loadUserFromStorage = () => (dispatch) => {
  const stored = localStorage.getItem("authUser");
  if (stored) {
    dispatch({ type: LOGIN_SUCCESS, savedata: JSON.parse(stored) });
  }
};
