import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/SpotsIndex";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import SpotForm from "./components/SpotForm/CreateSpot";
import ManageSpots from "./components/ManageSpots";
import CreateSpotForm from "./components/SpotForm/CreateSpot";
import UpdateSpotForm from "./components/SpotForm/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path="/" component={SpotsIndex} />
          <Route exact path="/spots" component={SpotsIndex} />
          <Route exact path="/spots/create" component={CreateSpotForm} />
          <Route exact path="/spots/:spotId/update" component={UpdateSpotForm} />
          <Route exact path="/spots/current" component={ManageSpots} />
          <Route path="/spots/:spotId" component={SpotDetails}/>
        </Switch>
      }
    </>
  );
}

export default App;
