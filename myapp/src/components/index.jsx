import React from "react";
import { Spinner} from "react-bootstrap";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default () => (
    <div className="_loading">
      <Spinner animation="border" role="status" className="_spinner-styles">
          <span className="sr-only">Waiting for Server....</span>
        </Spinner>
    </div>
)