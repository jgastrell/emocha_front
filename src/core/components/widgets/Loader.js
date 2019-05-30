import Controller from './Controller';
import { graphql, compose } from 'react-apollo';
import React from 'react';
import WIDGETS from '../../graphql/queries/WIDGETS';

const Loader = props => {
  return <Controller {...props}/>
};

export default compose(
  graphql(WIDGETS),
)(Loader);