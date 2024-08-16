import React from "react";
import Page404 from "../../components/Common/Page404";
import Generate from "./Generate";

import { Route, Switch } from "react-router-dom";
import Brands from "./Brands";
import Merchants from "./Merchants";
import Orders from "./Orders";
import Sales from "./Sales";



class Reports extends React.PureComponent {
  render() {

    return (
      <Switch>
        <Route exact path="/dashboard/s" component={Generate} />
        <Route exact path="/dashboard/reports/brands" component={Brands} />
        <Route exact path="/dashboard/s/merchants" component={Merchants} />
        <Route exact path="/dashboard/reports/orders" component={Orders} />
        <Route exact path="/dashboard/reports/sales" component={Sales} />
        <Route path="*" component={Page404} />
      </Switch>
    );
  }
}

export default Reports;