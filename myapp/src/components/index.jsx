import React from "react";
import { Row, Spinner} from "react-bootstrap";
import Logo from "../static/logo.png";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HeaderLogo = () => (
  <Row className="justify-content-md-center p-3">
    <img src={Logo} alt="Logo" className="_imageBlock" />
  </Row>
);

const HeaderDashboard = () => (
  <div className="_header-styles">
    <img src={Logo} alt="Logo" className="_imageBlock-sidebar" />
  </div>
);

const Footer = () => (
  <div className="_footerStyle">
    <div id="_footerSpacing">
      <em className="__fx-devtools-hide-shortcut__">
        Copyright © 2020 <span>Group 1</span>
        <p>All rights reserved.</p>
      </em>
    </div>
  </div>
);


const StaticSidebar = ({children}) => (
  <div className='my-sidebar'>
    <React.Fragment>{children}</React.Fragment>
  </div>
)

const LoadingScreen = () => (
  <div className="_body">
    <Spinner animation="border" role="status" className="_spinner-styles">
        <span className="sr-only">Loading...</span>
      </Spinner>
  </div>
)

export { HeaderLogo, Footer, HeaderDashboard, StaticSidebar, LoadingScreen};
