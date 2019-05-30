import Controller from './Controller';
import { graphql, compose } from 'react-apollo';
import React from 'react';
import ORDERS from "../../graphql/queries/ORDERS";

const Loader = props => {
  return <Controller {...props}/>
};

export default compose(
  graphql(ORDERS),
)(Loader);