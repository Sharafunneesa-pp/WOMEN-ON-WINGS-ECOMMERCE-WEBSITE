import React from "react";
import { connect } from "react-redux";

import { ROLES } from "../../constants";

import SubPage from "../../components/Manager/SubPage";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import NotFound from "../../components/Common/NotFound";
import { fetchMerchants } from "./actions";
import { dateFormatter, handleDownload } from "./helper";

class Merchants extends React.PureComponent {
  componentDidMount() {
    this.props.fetchMerchants();
  }

  render() {
    const { history, user, merchants, isLoading } = this.props;

    return (
      <SubPage
        title={user.role === ROLES.Admin ? "Merchant Report" : ""}
        actionTitle={user.role === ROLES.Admin && "Download"}
        handleAction={() => {
          handleDownload("merchant-table", "Merchant Report", 0.5);
        }}
      >
        {isLoading ? (
          <LoadingIndicator inline />
        ) : merchants.length > 0 ? (
          <table
            className="table table-bordered table-striped"
            id="merchant-table"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Business</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Active</th>
                <th>Status</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.business}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.isActive ? "Active" : "Inactive"}</td>
                    <td>{item.status}</td>
                    <td>{dateFormatter(item.created)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <NotFound message="No Merchands found." />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    merchants: state.merchant.merchants,
    isLoading: state.merchant.isLoading,
    user: state.account.user,
  };
};

export default connect(mapStateToProps,{fetchMerchants})(Merchants);
