import Controller from './Controller';
import { graphql, compose } from 'react-apollo';
import React from 'react';
import CREATE_ORDER from '../../graphql/mutations/CREATE_ORDER';

const Loader = props => {
  return <Controller {...props}/>
};

export default compose(
  graphql(CREATE_ORDER, { name: 'createOrder' }),
)(Loader);