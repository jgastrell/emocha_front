import gql from 'graphql-tag';

const WIDGETS = gql`
  query widgets($type: String, $size: String, $color: String, $quantity: Int) {
    widgets(type: $type, size: $size, color: $color, quantity: $quantity) {
      id
      type
      size
      color
      quantity
    }
  }
`;

export default WIDGETS;
