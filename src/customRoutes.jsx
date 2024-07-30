import * as React from "react";
import { Route } from 'react-router-dom';
import SwaggerUI from './components/SwaggerUI';


const routes = [
    <Route exact path="/swagger-ui" component={SwaggerUI} />
];

export default routes;