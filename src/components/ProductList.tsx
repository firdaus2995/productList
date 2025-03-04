import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchCategories,
  resetProducts,
} from '../redux/productSlice';
import ProductItem from './ProductItem';

interface ProductListProps {
  searchQuery: string;
}

const ProductList: React.FC<ProductListProps> = ({searchQuery}) => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.items);
  const totalProducts = useSelector((state: any) => state.products.total);
  const loading = useSelector((state: any) => state.products.loading);
  const categories = useSelector((state: any) => state.products.categories);
  const skip = useSelector((state: any) => state.products.skip);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetProducts());
    if (selectedCategory === 'all') {
      dispatch(fetchProducts({limit: 10, skip: 0}));
    } else {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  const loadMore = () => {
    if (products.length < totalProducts) {
      dispatch(fetchProducts({limit: 10, skip}));
    }
  };

  if (loading) {
    return (
      <View className="flex h-screen items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const filteredProducts = products.filter((product: any) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View className="p-4 ">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="m-4">
        <TouchableOpacity
          onPress={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg mx-2 ${
            selectedCategory === 'all' ? 'bg-blue-500' : 'bg-gray-200'
          }`}>
          <Text
            className={`${
              selectedCategory === 'all' ? 'text-white' : 'text-black'
            }`}>
            All
          </Text>
        </TouchableOpacity>
        {categories?.map((category: any) => (
          <TouchableOpacity
            key={category.slug}
            onPress={() => setSelectedCategory(category.slug)}
            className={`px-4 py-2 rounded-lg mx-2 h-10 ${
              selectedCategory === category.slug ? 'bg-blue-500' : 'bg-gray-200'
            }`}>
            <Text
              className={`${
                selectedCategory === category.slug ? 'text-white' : 'text-black'
              }`}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredProducts}
        renderItem={({item}) => <ProductItem product={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{paddingBottom: 200}}
        ListFooterComponent={
          filteredProducts.length > 0 &&
          filteredProducts.length % 10 === 0 &&
          filteredProducts.length < totalProducts &&
          !loading ? (
            <TouchableOpacity
              onPress={loadMore}
              className="bg-blue-500 p-3 rounded-lg mt-4 self-center">
              <Text className="text-white text-center">Load More</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

export default ProductList;
