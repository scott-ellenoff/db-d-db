import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderLogo, Footer } from "../../components/index";
import { navigate, Redirect, Router } from "@reach/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loggedIn } from "../../store/actions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Login = (props) => {

  const { loggedIn, action } = props;

  // const [userLogin, setUserLogin] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem('loggedIn') != null) {
  //     console.log(props)
  //     loginSuccess();
  //   }
  // });

  // const loginSuccess = () => {
  //   if (localStorage.getItem('loggedIn') == null) {
  //     action.loggedIn({ oauth: true });
  //   }
  // };

  const formValues = {
    id: "",
    password: "",
  };

  const [hiddenPassword, setHiddenPassword] = useState("password");

  const hidePassword = () => {
    if (hiddenPassword === "password") setHiddenPassword("text");
    if (hiddenPassword === "text") setHiddenPassword("password");
  };

  const loginSchema = Yup.object().shape({
    id: Yup.string()
      .required("Please enter user id")
      .test(
        "id-check",
        "Please enter a valid user id",
        function (value) {
          var id_val = false;
          if (/^\S+$/.test(value)) {
            return !id_val;
          } else {
            return id_val;
          }
        }
      ),
    password: Yup.string()
      .min(8, "Password has to be at least 8 characters")
      .required("Please enter password"),
  });

  const postParams = (values, resetForm) => {
    // action.login(values);
    localStorage.setItem('loggedIn', 'true')
    action.loggedIn({ oauth: true });
    resetForm({ values: "" });
  };

  return (
    <>
      <Row className="justify-content-md-center">
        <div className="_loginblock">
          <Row>
            <div className="_title-space">
              <h3 className="_login-layout">Welcome user</h3>
            </div>
          </Row>
          <Formik
            initialValues={formValues}
            onSubmit={(values, { resetForm }) => {
              postParams(values, resetForm);
            }}
            validationSchema={loginSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="_field-spacing">
                  <label>User id</label>
                  <Field
                    className={`_form-space ${errors.id && touched.id ? "_field-error" : ""
                      } `}
                    type="text"
                    name="id"
                    placeholder="group1"
                  ></Field>
                  {errors.id && touched.id ? (
                    <span className="_error-message">{errors.id}</span>
                  ) : null}
                </div>
                <div className="_field-spacing _field-password">
                  <label>Password</label>
                  <Field
                    className={`_form-space ${errors.password && touched.password ? "_field-error" : ""
                      } `}
                    type={hiddenPassword}
                    name="password"
                    placeholder="super safe password"
                  ></Field>
                  {errors.password && touched.password ? (
                    <span className="_error-message">{errors.password}</span>
                  ) : null}
                </div>
                <button type='submit' className="_button-submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      </Row>
    </>
  );
};

const mapStateToProps = ({ loggedIn }) => {
  return {
    loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = {
    loggedIn,
  };
  return {
    action: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)