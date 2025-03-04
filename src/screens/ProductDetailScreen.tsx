import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductDetail} from '../redux/productSlice';
import {ArrowLeft} from 'lucide-react-native';
import {addToCart, updateQuantity} from '../redux/cartSlice';

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {productId}: any = route.params;

  const dispatch = useDispatch();
  const product = useSelector((state: any) => state.products.productDetail);
  const loading = useSelector((state: any) => state.products.loading);
  const cartItems = useSelector((state: any) => state.cart.items);
  const cartItem = cartItems.find((item: any) => item.id === product.id);
  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);

  useEffect(() => {
    dispatch(fetchProductDetail(productId));
  }, [dispatch, productId]);

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

  if (loading || !product) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View className="p-4 bg-white flex-1">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <ArrowLeft size={28} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2">{product.category}</Text>
      </View>
      <Image
        source={{uri: product.thumbnail}}
        className="w-full h-60 rounded-lg"
      />

      <Text className="text-lg font-bold mt-4">{product.title}</Text>
      <Text className="text-gray-600">₹ {product.price} / unit</Text>

      {quantity > 0 ? (
        <View className="flex-row items-center justify-center gap-2 mt-2">
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

      <Text className="mt-4 text-black text-2xl">Description</Text>
      <Text className="mt-2 text-gray-700">{product.description}</Text>
    </View>
  );
};

export default ProductDetail;
