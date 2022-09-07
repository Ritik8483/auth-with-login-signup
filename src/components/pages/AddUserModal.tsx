import { Form, Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import InputField from "../../reuseable/InputField";
import {
  useAddEmployeeMutation,
  useEditEmployeeMutation,
} from "../../rtk/EmployeeRtk";

const initialValues = {
  name: "",
  email: "",
  phone: "",
};

const AddUserModal = ({ addUser, onHide, ...rest }: any) => {
  const { userDetail } = rest;
  console.log("userDetail", userDetail);

  const [addEmployee] = useAddEmployeeMutation();
  const [editEmployee] = useEditEmployeeMutation();

  const validation = Yup.object().shape({
    name: Yup.string().required("Employee name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Employee email is required"),
    phone: Yup.number().required("Employee phone number is required"),
  });
  const submitDetails = async (values: any) => {
    if (userDetail.id) {
      if (values === userDetail) {
        toast.success("No changes were made");
      } else {
        try {
          await editEmployee({id:userDetail.id,values:values});
          toast.success("Employee details updated successfully!");
        } catch (error: any) {
          console.log("error", error);
        }
      }
    } else {
      try {
        await addEmployee(values);
        toast.success("Employee added successfully");
      } catch (error: any) {
        console.log("error", error);
      }
    }
    onHide();
  };

  return (
    <div>
      <Modal show={addUser} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{userDetail.id ? "Edit" : "Add"} Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={userDetail || initialValues}
            validationSchema={validation}
            onSubmit={submitDetails}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <InputField
                  name="name"
                  label="Employee name"
                  value={values.name}
                  type="text"
                  isValid={touched.name && !errors.name}
                  isInvalid={!!errors.name}
                  placeholder="Enter employee name"
                  onChange={handleChange}
                  errors={errors.name}
                />
                <InputField
                  name="email"
                  label="Employee email"
                  value={values.email}
                  type="email"
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                  placeholder="Enter employee email"
                  onChange={handleChange}
                  errors={errors.email}
                />
                <InputField
                  name="phone"
                  label="Employee phone number"
                  value={values.phone}
                  type="number"
                  isValid={touched.phone && !errors.phone}
                  isInvalid={!!errors.phone}
                  placeholder="Enter employee phone number"
                  onChange={handleChange}
                  errors={errors.phone}
                />
                <div className="d-flex justify-content-end gap-2 mt-2">
                  <Button variant="secondary" onClick={onHide}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary">
                    {userDetail ? "Update Employee" : "Save"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddUserModal;
