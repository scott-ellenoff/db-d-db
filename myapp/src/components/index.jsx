import React from "react";
import { Row, Spinner} from "../Views/imports";
import github from "../static/img/github.png";
import linkedin from "../static/img/linkedin.png";
import Logo from "../static/img/NEGATIVO.svg";
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
    <div>
      <a className="_image-url" href="https://github.com/thecodeworkers" rel="noopener noreferrer"target="_blank">
        <img className="_image" src={linkedin} alt="Linkedin" width="40"/>
      </a>
      <a className="_image-url"href="https://www.linkedin.com/company/the-code-workers/" rel="noopener noreferrer"target="_blank">
        <img className="_image" src={github} alt="Github" width="32"/>
      </a>
    </div>
    <div id="_footerSpacing">
      <em className="__fx-devtools-hide-shortcut__">
        Copyright © 2020 <span>The Code Workers</span>
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
