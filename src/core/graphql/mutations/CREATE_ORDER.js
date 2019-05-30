import gql from 'graphql-tag';

const CREATE_ORDER = gql`
  mutation createOrder($widgets: [OrderWidgetsInput!]) {
    createOrder(widgets: $widgets)
  }
`;

export default CREATE_ORDER;
