import React, { useState, useEffect } from "react";
import { Container, Row } from "bootstrap";
import "./login_styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeaderLogo, Footer } from "../../components/index";
import { navigate } from "@reach/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { setStorage } from "../../utils/storageService";

const LoginContainer = (props) => {

  const formValues = {
    id: "",
    password: "",
  };

  const [showAlert, setShowAlert] = useState(false);

  const [hiddenPassword, setHiddenPassword] = useState("password");

  const hidePassword = () => {
    if (hiddenPassword === "password") setHiddenPassword("text");
    if (hiddenPassword === "text") setHiddenPassword("password");
  };

  const displayAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  useEffect(() => {
    if (login.error != null) displayAlert();
  }, [login.error]);

  useEffect(() => {
    if (login.result != null) {
      loginSuccess();
    }
    return () => {
      login.result = null;
    };
  }, [login.result]);

  const loginSuccess = () => {
    setStorage("oauth", login.result);
    action.loggedIn({ oauth: true });
    navigate("/dashboard");
  };

  const loginSchema = Yup.object().shape({
    id: Yup.string()
      .required("Please enter email or username")
      .test(
        "id-check",
        "Please enter a valid email address or username",
        function (value) {
          var id_val = false;
          if (/^[\w]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
            return !id_val;
          } else if (/^\S+$/.test(value)) {
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
    action.login(values);
    resetForm({ values: "" });
  };

  return (
    <Container fluid className="_body">
      <HeaderLogo></HeaderLogo>
      <Row className="justify-content-md-center">
        <div className="_loginblock">
          <Row>
            <div className="_title-space">
              <h3 className="_login-layout">Welcome to TCW Daily Report</h3>
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
                  <label>Username / Email</label>
                  <Field
                    className={`_form-space ${
                      errors.id && touched.id ? "_field-error" : ""
                    } `}
                    type="text"
                    name="id"
                    placeholder="tcw2020 or example@something.com"
                  ></Field>
                  {errors.id && touched.id ? (
                    <span className="_error-message">{errors.id}</span>
                  ) : null}
                </div>
                <div className="_field-spacing _field-password">
                  <label>Password</label>
                  <Field
                    className={`_form-space ${
                      errors.password && touched.password ? "_field-error" : ""
                    } `}
                    type={hiddenPassword}
                    name="password"
                    placeholder="Enter password"
                  ></Field>
                  <span
                    className="_hide-password-login"
                    type="text"
                    onClick={() => hidePassword()}
                  >
                    {hiddenPassword === "password" ? "Show" : "Hide"}
                  </span>
                  {errors.password && touched.password ? (
                    <span className="_error-message">{errors.password}</span>
                  ) : null}
                </div>
                <button type='submit' className="_button-submit">Submit</button>
              </Form>
            )}
          </Formik>
          <div className="_end-of-block">
            <p>Forgot Password</p>
          </div>
        </div>
      </Row>
      <Row className="justify-content-md-center">
        <div className="_create-account-block">
          <div className="_create-account-space">
            <p className="_url-styles" onClick={() => navigate("/register")}>
              Create Account
            </p>
          </div>
        </div>
      </Row>
      <div
        className={`justify-content-md-center ${
          showAlert ? "_show-alert-login" : "_no-show-alert-login"
        }`}
      >
        <p
          className={`justify-content-md-center ${
            showAlert ? "_show-alert-text" : "_no-show-alert-text"
          }`}
        >
          {login.error !== null ? login.error.result : null}
        </p>
      </div>
      <Footer></Footer>
    </Container>
  );
};


export default LoginContainer;
