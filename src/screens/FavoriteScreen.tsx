import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeFavorite} from '../redux/favoriteSlice';
import {ArrowLeft, Trash2} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

const FavoriteList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.items);

  return (
    <View className="p-4">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <ArrowLeft size={28} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2">Favorite Products</Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View className="flex-row items-center p-2 border-b">
            <Image source={{uri: item.thumbnail}} className="w-12 h-12 mx-2" />
            <View className="flex-1">
              <Text className="font-bold">{item.title}</Text>
              <Text className="text-gray-500">
                $ {item.price}
              </Text>
            </View>

            <TouchableOpacity onPress={() => dispatch(removeFavorite(item.id))}>
              <Trash2 color="red" size={20} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default FavoriteList;
