import React from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { login } from "../../redux/slices/authSlice";

const LOGIN_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const initialValues = {
  email: "test1@mail.com",
  password: "test12345",
};

function LoginForm(props) {
  const dispatch = useDispatch();

  const hendleSubmit = (values, formikBag) => {
    dispatch(login(values))
    formikBag.resetForm();
  };

  return (
    <>
      <div>LoginForm</div>
      <Formik
        initialValues={initialValues}
        validationSchema={LOGIN_SCHEMA}
        onSubmit={hendleSubmit}
      >
        <Form>
          <Field name="email" type="email" placeholder="Email" />
          <Field name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </>
  );
}

export default LoginForm;
