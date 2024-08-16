import React from "react";
import { connect } from "react-redux";

import { ROLES } from "../../constants";

import LoadingIndicator from "../../components/Common/LoadingIndicator";
import NotFound from "../../components/Common/NotFound";
import SubPage from "../../components/Manager/SubPage";
import { fetchSales } from "./actions";
import { handleDownload, QtoM } from "./helper";

class Sales extends React.PureComponent {
  componentDidMount() {
    this.props.fetchSales();
  }

  render() {
    const { history, user, monthly, quaterly, isLoading } = this.props;

    return (
      <SubPage
        title={user.role === ROLES.Admin ? "Sales " : ""}
        actionTitle={user.role === ROLES.Admin && "Download"}
        handleAction={() => { handleDownload("sales-table", "Sales Report"); }}
      >
        {isLoading ? (
          <LoadingIndicator inline />
        ) : monthly ? (
          <div id="sales-table">
            <h3>Monthly Report</h3>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Order Count</th>
                  <th>Product Count</th>
                  <th>Total Income</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(monthly).map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{monthly[key].orderCount}</td>
                    <td>{monthly[key].productCount}</td>
                    <td>{monthly[key].total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <h3>Quaterly Report</h3>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Quater</th>
                  <th>Month</th>
                  <th>Order Count</th>
                  <th>Product Count</th>
                  <th>Total Income</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(quaterly).map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{QtoM(key)}</td>
                    <td>{quaterly[key].orders.length}</td>
                    <td>{quaterly[key].productCount}</td>
                    <td>{quaterly[key].totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NotFound message="No Sales found." />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.sales.quaterly);
  return {
    user: state.account.user,
    monthly: state.sales.monthly,
    quaterly: state.sales.quaterly,
    isLoading: state.sales.isLoading
  };
};

export default connect(mapStateToProps, { fetchSales })(Sales);
