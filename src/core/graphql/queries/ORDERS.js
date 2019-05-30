import gql from 'graphql-tag';

const ORDERS = gql`
  query orders($id: ID) {
    orders(id: $id) {
      id
      widgets
    }
  }
`;

export default ORDERS;
