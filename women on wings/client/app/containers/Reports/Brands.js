import React from "react";
import { connect } from "react-redux";

import { ROLES } from "../../constants";

import SubPage from "../../components/Manager/SubPage";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import NotFound from "../../components/Common/NotFound";
import {fetchBrands} from "./actions"
import {dateFormatter, handleDownload} from "./helper"


class Brand extends React.PureComponent {
  componentDidMount() {
    this.props.fetchBrands();
  }

  render() {

    const { history, brands, isLoading, user } = this.props;

    return (
      <SubPage
        title={user.role === ROLES.Admin ? "Brand Report" : ""}
        actionTitle={user.role === ROLES.Admin && "Download"}
        handleAction={() => {handleDownload("brand-table", "Brand Report");}}
      >
        {isLoading ? (
          <LoadingIndicator inline />
        ) : brands.length > 0 ? (
          <table className="table table-bordered table-striped" id="brand-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Merchant</th>
                <th>Active</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      {item.merchant ? item.merchant.name : "No Merchant"}
                    </td>
                    <td>{item.isActive ? "Active" : "Inactive"}</td>
                    <td>{dateFormatter(item.created)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <NotFound message="No brands found." />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brands: state.brand.brands,
    isLoading: state.brand.isLoading,
    user: state.account.user,
  };
};

export default connect(mapStateToProps, {fetchBrands})(Brand);
