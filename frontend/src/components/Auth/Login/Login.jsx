import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loginUser = async () => {
    //Login User
    try {
      setIsLoading(true);
      const data = {
        email: formData.email,
        password: formData.password,
      };
      const res = await axios.post(`${API_BASE_URL}/auth/login`, data);

      if (res.status == 200) {
        enqueueSnackbar("User logged in successfully", { variant: "success" });
        localStorage.setItem("token", res?.data?.token);
        navigate("/");
      }
    } catch (error) {
      if (error?.response?.data?.message)
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });

      console.log("Error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <MDBContainer fluid className="login-body">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                name="email"
                onChange={(e) => handleInputUpdate(e)}
                id="formControlLg"
                className="form-input"
                type="email"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                name="password"
                id="formControlLg"
                className="form-input"
                type="password"
                onChange={(e) => handleInputUpdate(e)}
                size="lg"
              />
              <MDBBtn
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={loginUser}
              >
                Login
              </MDBBtn>

              <div>
                <p className="mb-0 my-4">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-white-50 fw-bold">
                    Sign Up
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

export default Login;
