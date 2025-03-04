import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ShoppingCart, Search, Heart} from 'lucide-react-native';
import ProductList from '../components/ProductList';
import {NavigationProps} from '../navigation/navigationTypes';

const ProductListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View className="flex-1">
      <View className="flex-row items-center p-4 bg-white shadow gap-2">
        <View className="flex-row items-center border border-gray-300 rounded-lg px-2 py-1 flex-1 mx-2">
          <Search size={20} color="gray" />
          <TextInput
            className="flex-1 ml-2 text-black"
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <ShoppingCart size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Heart color="black" size={24} />
        </TouchableOpacity>
        <Text>;</Text>
      </View>

      <ProductList searchQuery={searchQuery} />
    </View>
  );
};

export default ProductListScreen;
