import React from "react";
import { connect } from "react-redux";

import { ROLES } from "../../constants";

import SubPage from "../../components/Manager/SubPage";
import { Link } from "react-router-dom";


class Generate extends React.PureComponent {
  render() {
    const { history, user } = this.props;
    return (
      <SubPage title={user.role === ROLES.Admin ? "Generate Reports" : ""}>
        <div className="d-flex justify-content-evenly mt-4">
          <Link
            className="input-btn custom-btn-none sm text-only icon-left mr-3"
            to="/dashboard/reports/sales"
          >
            Sales
          </Link>
          <Link
            className="input-btn custom-btn-none sm text-only icon-left mr-3"
            to="/dashboard/reports/merchants"
          >
            Merchants
          </Link>
          <Link
            className="input-btn custom-btn-none sm text-only icon-left mr-3"
            to="/dashboard/reports/orders"
          >
            Orders
          </Link>
          <Link
            className="input-btn custom-btn-none sm text-only icon-left"
            to="/dashboard/reports/brands"
          >
            Brands
          </Link>
        </div>
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps)(Generate);
