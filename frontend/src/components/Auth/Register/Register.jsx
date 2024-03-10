import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import "./Register.css";

import { API_BASE_URL } from "../../../config";

function Register() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const registerUser = async () => {
    if (formData.password !== formData.confirmPassword) {
      return enqueueSnackbar("Password and confirm password doesn't match", {
        variant: "error",
      });
    }

    //Register user
    try {
      setIsLoading(true);
      const data = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const res = await axios.post(`${API_BASE_URL}/auth/register`, data);

      if (res.status == 201)
        enqueueSnackbar("User registered successfully", { variant: "success" });
      navigate("/login");
    } catch (error) {
      if (error?.response?.data?.message)
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });

      console.log("Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="login_body">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
              <p className="text-white-50 mb-5">
                Please enter your username, email and password!
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                color="white"
                labelClass="text-white"
                className="form-input"
                onChange={(e) => handleInputUpdate(e)}
                name="username"
                label="User name"
                id="formControlLg"
                type="text"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                className="form-input"
                onChange={(e) => handleInputUpdate(e)}
                name="email"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                className="form-input"
                onChange={(e) => handleInputUpdate(e)}
                name="password"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                className="form-input"
                onChange={(e) => handleInputUpdate(e)}
                name="confirmPassword"
                label="Confirm Password"
                id="formControlLg"
                type="password"
                size="lg"
              />

              <MDBBtn
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={registerUser}
              >
                {isLoading ? (
                  <>
                    <MDBSpinner
                      size="sm"
                      role="status"
                      tag="span"
                      className="me-2"
                    />
                    Loading...
                  </>
                ) : (
                  "Sign Up"
                )}
              </MDBBtn>

              <div>
                <p className="mb-0 my-4">
                  Already have an account?{" "}
                  <Link to="/login" className="text-white-50 fw-bold">
                    Login
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
