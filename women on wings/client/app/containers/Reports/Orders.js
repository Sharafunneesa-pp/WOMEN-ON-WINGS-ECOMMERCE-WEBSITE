import React from "react";
import { connect } from "react-redux";

import { ROLES } from "../../constants";

import SubPage from "../../components/Manager/SubPage";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import NotFound from "../../components/Common/NotFound";
import { fetchOrders } from "./actions";
import { dateFormatter, handleDownload } from "./helper";

class Orders extends React.PureComponent {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const { history, user, orders, isLoading } = this.props;

    return (
      <SubPage
        title={user.role === ROLES.Admin ? "Orders Report" : ""}
        actionTitle={user.role === ROLES.Admin && "Download"}
        handleAction={() => {
          handleDownload("order-table", "Order Report", 0.5);
        }}
      >
        {isLoading ? (
          <LoadingIndicator inline />
        ) : orders.length > 0 ? (
          <table
            className="table table-bordered table-striped"
            id="order-table"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Order ID</th>
                <th>Product Count</th>
                <th>Total</th>
                <th>Tax</th>
                <th>Total With Tax</th>
                <th>Purchase On</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.user.firstName} {item.user.lastName}</td>
                    <td>{item._id}</td>
                    <td>{item.products.length}</td>
                    <td>{item.total}</td>
                    <td>{item.totalTax}</td>
                    <td>{item.totalWithTax}</td>
                    <td>{dateFormatter(item.created)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <NotFound message="No Orders found." />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = (state) => {
 return {
   user: state.account.user,
   orders: state.order.orders,
   isLoading: state.order.isLoading,
   advancedFilters: state.order.advancedFilters,
   isOrderAddOpen: state.order.isOrderAddOpen,
 };
};

export default connect(mapStateToProps,{fetchOrders})(Orders);
