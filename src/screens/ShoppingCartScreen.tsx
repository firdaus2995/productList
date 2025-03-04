import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart, updateQuantity} from '../redux/cartSlice';
import {ArrowLeft, Square, CheckSquare} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

const CartScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const [checkedItems, setCheckedItems] = useState<{[key: number]: boolean}>(
    {},
  );

  const toggleCheck = (id: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleIncrease = (id: number) =>
    dispatch(updateQuantity({id, amount: 1}));
  const handleDecrease = (id: number) =>
    dispatch(updateQuantity({id, amount: -1}));

  const subtotal = cartItems.reduce(
    (
      acc: number,
      item: {id: string | number | any; price: number; quantity: number},
    ) => {
      return checkedItems[item.id] ? acc + item.price * item.quantity : acc;
    },
    0,
  );

  const handleCheckout = () => {
    if (subtotal === 0) {
      Alert.alert(
        'Checkout Gagal',
        'Pilih setidaknya satu item untuk checkout.',
      );
      return;
    }

    Object.keys(checkedItems).forEach(id => {
      if (checkedItems[Number(id)]) {
        dispatch(removeFromCart(Number(id)));
      }
    });

    setCheckedItems({});
    Alert.alert('Checkout Successful', 'Your order has been processed.', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  return (
    <View className="p-4 bg-white h-full">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <ArrowLeft size={28} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2">Shopping Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View className="flex-row items-center p-2 border-b">
            <TouchableOpacity
              onPress={() => toggleCheck(item.id)}
              className="p-2">
              {checkedItems[item.id] ? (
                <CheckSquare size={24} color="green" />
              ) : (
                <Square size={24} color="black" />
              )}
            </TouchableOpacity>

            <Image source={{uri: item.thumbnail}} className="w-12 h-12 mx-2" />
            <View className="flex-1">
              <Text className="font-bold">{item.title}</Text>
              <Text className="text-gray-500">
                $ {item.price * item.quantity}
              </Text>
            </View>

            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => handleDecrease(item.id)}
                className="p-2">
                <Text className="text-xl">-</Text>
              </TouchableOpacity>
              <Text className="mx-2">{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => handleIncrease(item.id)}
                className="p-2">
                <Text className="text-xl">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {cartItems.length > 0 && (
        <TouchableOpacity
          onPress={handleCheckout}
          className={`p-4 rounded-lg mt-4 ${
            subtotal > 0 ? 'bg-blue-500' : 'bg-gray-300'
          }`}>
          <Text className="text-white text-center">
            Checkout (${subtotal.toFixed(2)})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CartScreen;
