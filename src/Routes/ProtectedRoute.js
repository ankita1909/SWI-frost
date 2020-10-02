import React from "react";
import { Route, Redirect } from "react-router-dom";
import {BaseConfig} from '../Context/BaseConfigContext.js'

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
	const {BaseConfContext, setBaseConfContext} = React.useContext(BaseConfig)
  return (
    <Route
      {...rest}
      render={props => {
        if (BaseConfContext != null && BaseConfContext.hasOwnProperty("BaseUrl")) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};