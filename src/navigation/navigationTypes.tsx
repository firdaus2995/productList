import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: {productId: number};
  Favorites: undefined;
  Cart: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
