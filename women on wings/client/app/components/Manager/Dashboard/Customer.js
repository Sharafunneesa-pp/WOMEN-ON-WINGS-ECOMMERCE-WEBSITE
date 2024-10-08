/*
 *
 * Customer
 *
 */

import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

import Page404 from '../../Common/Page404';
import AccountMenu from '../AccountMenu';

import Account from '../../../containers/Account';
import AccountSecurity from '../../../containers/AccountSecurity';
import Address from '../../../containers/Address';
import Order from '../../../containers/Order';
import Wishlist from '../../../containers/WishList';
import { isProviderAllowed } from '../../../utils/app';

const Customer = props => {
  const { user } = props;

  return (
    <div className='customer'>
      <Row>
        <Col xs='12' md='5' xl='3'>
          <AccountMenu {...props} />
        </Col>
        <Col xs='12' md='7' xl='9'>
          <div className='panel-body'>
            <Switch>
              <Route exact path='/dashboard' component={Account} />
              {!isProviderAllowed(user.provider) && (
                <Route path='/dashboard/security' component={AccountSecurity} />
              )}
              <Route path='/dashboard/address' component={Address} />
              <Route path='/dashboard/' component={Order} />
              <Route path='/dashboard/wishlist' component={Wishlist} />
              <Route path='*' component={Page404} />
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Customer;
