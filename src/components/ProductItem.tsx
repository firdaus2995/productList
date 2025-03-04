import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, updateQuantity} from '../redux/cartSlice';
import {useNavigation} from '@react-navigation/native';
import {Heart, HeartOff} from 'lucide-react-native';
import {addFavorite, removeFavorite} from '../redux/favoriteSlice';
import {NavigationProps} from '../navigation/navigationTypes';

const ProductItem = ({product}: any) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const navigation = useNavigation<NavigationProps>();
  const favorites = useSelector((state: any) => state.favorites.items);
  const isFavorite = favorites.some(
    (item: {id: any}) => item.id === product.id,
  );

  const goToDetail = (id: any) => {
    navigation.navigate('ProductDetail', {productId: id});
  };

  const cartItem = cartItems.find((item: {id: any}) => item.id === product.id);

  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);

  useEffect(() => {
    setQuantity(cartItem?.quantity || 0);
  }, [cartItem]);

  const handleAddToCart = () => {
    dispatch(addToCart({...product, quantity: 1}));
  };

  const handleIncrease = () => {
    dispatch(updateQuantity({id: product.id, amount: 1}));
  };

  const handleDecrease = () => {
    if (quantity >= 1) {
      dispatch(updateQuantity({id: product.id, amount: -1}));
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  return (
    <View className="bg-white rounded-2xl shadow-lg p-4 m-2 flex flex-col justify-between">
      <TouchableOpacity onPress={() => goToDetail(product.id)}>
        <View className="flex items-center justify-center">
          <View className="flex justify-end items-end w-full">
            <TouchableOpacity onPress={toggleFavorite}>
              {isFavorite ? (
                <Heart color="red" size={20} />
              ) : (
                <HeartOff color="gray" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <Image
            source={{uri: product.thumbnail}}
            className="w-20 h-20 rounded-lg"
          />
        </View>
        <Text className="text-lg font-bold mt-2 w-40">{product.title}</Text>
        <Text className="text-gray-500">$ {product.price}</Text>
      </TouchableOpacity>

      {quantity > 0 ? (
        <View className="flex-row justify-between items-center mt-2">
          <TouchableOpacity
            onPress={handleDecrease}
            className="bg-gray-200 p-2 rounded-full">
            <Text>-</Text>
          </TouchableOpacity>
          <Text>{quantity}</Text>
          <TouchableOpacity
            onPress={handleIncrease}
            className="bg-yellow-400 p-2 rounded-full">
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleAddToCart}
          className="bg-yellow-400 p-2 rounded-lg mt-2">
          <Text className="text-center text-white">ADD</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductItem;
