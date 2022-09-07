import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import InputField from "../../reuseable/InputField";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../rtk/AuthUser";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLocalStorage } from "../../slice/AuthUserSlice";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const [loginUser, { data: loginData,isError:loginIsError,isSuccess:loginIsSuccess,error:loginError }] = useLoginUserMutation();
  const validation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is required"),
  });
  const submitFormDetails = async (values: any) => {
    if(values){
        try {
            await loginUser(values); 
          } catch (error: any) {
            console.log("error", error);
          }
          if(loginIsError){
            return;
          }
    }
    console.log("Loginvalues", values);
  }; 
  useEffect(()=>{
    if(loginIsError){
        toast.error((loginError as any).data.message);
    }
  },[loginIsError]);

  useEffect(()=>{
    if(loginIsSuccess){
        toast.success("User logged in successfully");
        dispatch(setLocalStorage({name:loginData.result.name,token:loginData.token}));
        navigate('dashboard')
    }
  },[loginIsSuccess]);
  console.log("loginData", loginData);

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
        <h2>Login</h2>
        <p>Enter your email and password to get started</p>
        <Formik
          onSubmit={submitFormDetails}
          validationSchema={validation}
          initialValues={initialValues}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <InputField
                type="email"
                name="email"
                label="Email address"
                errors={errors.email}
                controlId="emailValidation"
                placeholder="Enter your email"
                isValid={touched.email && !errors.email}
                value={values.email}
                isInvalid={!!errors.email}
                onChange={handleChange}
              />
              <InputField
                type="password"
                name="password"
                label="Password"
                errors={errors.password}
                controlId="passwordValidation"
                placeholder="Enter your password"
                isValid={touched.password && !errors.password}
                value={values.password}
                isInvalid={!!errors.password}
                onChange={handleChange}
              />
              <div className="d-flex flex-column w-100 justify-content-center">
                <Button type="submit">Login</Button>
                <div className="mt-4 ">
                  <p>
                    Don't have an account?{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("signup")}
                      className="text-primary text-decoration-none"
                    >
                      Sign up
                    </span>{" "}
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
