import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";

const Login = ({ onSuccess }) => {
  const [email, setEmail] = useState("revati.b@rw.com");
  const [password, setPassword] = useState("divine123");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(email, password));
    if (result.success) {
      onSuccess?.();
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-3" style={{ color: "#e22828" }}>
          Teacher Sign In
        </h3>
        <p className="text-center text-muted small mb-4">click Sign In.</p>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ background: "#de1a1a" }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
