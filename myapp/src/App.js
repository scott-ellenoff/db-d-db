import React, { useEffect } from "react";
import  {Router, Location} from '@reach/router';
import {Login} from "./views";
import posed, { PoseGroup } from "react-pose";

const RouteContainer = posed.div({
  enter: { x: "0%", transition: { duration: 600 } },
  exit: { x: "100%" },
});

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.key}>
          <Router location={location}>{children}</Router>
        </RouteContainer>
      </PoseGroup>
    )}
  </Location>
);

const App = () => {
 
  return (
    <PosedRouter>
      <Login path="/" />
    </PosedRouter>
  );
};


export default App;
