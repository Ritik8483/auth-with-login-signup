import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import InputField from "../../reuseable/InputField";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../rtk/AuthUser";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLocalStorage } from "../../slice/AuthUserSlice";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [registerUser, { data:registerData, isSuccess:registerIsSuccess, isError:registerIsError, error:registerError }] =
    useRegisterUserMutation();

  const validation = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Please confirm your password"),
  });
  const submitFormDetails = async(values: any) => {
    const {firstName,lastName,email,password,confirmPassword}=values;
    if(values.password!==values.confirmPassword){
        toast.error("Password and confirm password must be same");
    }
    else if(firstName && lastName && email && password && confirmPassword){
        try{
            await registerUser({firstName,lastName,email,password,confirmPassword});
        }
        catch(error:any){
            console.log('error',error);
        }
        navigate('dashboard');
    }
    console.log('values',values);
  };
  useEffect(()=>{
    if(registerIsSuccess){
      dispatch(setLocalStorage({name:registerData.result.name,token:registerData.token}))
      toast.success('User registered successfully');
    navigate('dashboard');
    }
  },[registerIsSuccess]);

  useEffect(()=>{
    if(registerIsError){
      toast.error((registerError as any).data.message);
    }
},[registerIsError]);


  return (
    <div>
      <div className="d-flex py-4 flex-column justify-content-center align-items-center min-vh-100 bg-light">
        <h2>Sign up</h2>
        <p>Enter your credentials to get started</p>
        <Formik
          validationSchema={validation}
          initialValues={initialValues}
          onSubmit={submitFormDetails}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <InputField
                type="text"
                name="firstName"
                label="First Name"
                errors={errors.firstName}
                controlId="firstNameValidation"
                placeholder="Enter your first name"
                isValid={touched.firstName && !errors.firstName}
                value={values.firstName}
                isInvalid={!!errors.firstName}
                onChange={handleChange}
              />
              <InputField
                type="text"
                name="lastName"
                label="Last Name"
                errors={errors.lastName}
                controlId="lastNameValidation"
                placeholder="Enter your last name"
                isValid={touched.lastName && !errors.lastName}
                value={values.lastName}
                isInvalid={!!errors.lastName}
                onChange={handleChange}
              />
              <InputField
                type="email"
                name="email"
                label="Email"
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
              <InputField
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                errors={errors.confirmPassword}
                controlId="confirmPasswordValidation"
                placeholder="Confirm Password"
                isValid={touched.confirmPassword && !errors.confirmPassword}
                value={values.confirmPassword}
                isInvalid={!!errors.confirmPassword}
                onChange={handleChange}
              />
              <div className="d-flex flex-column w-100 justify-content-center">
                <Button type="submit">Signup</Button>
                <div className="mt-4 ">
                  <p>
                    Already have an account?{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("login")}
                      className="text-primary text-decoration-none"
                    >
                      Login
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

export default SignUp;
