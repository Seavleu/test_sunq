import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ErrorFixItem {
  id: string;
  title: string;
}

const ErrorFixListScreen = () => {
  const [data, setData] = useState<ErrorFixItem[]>([]);
  const navigation = useNavigation();

  useEffect(() => { 
    setData([{ id: '1', title: 'Error 1' }, { id: '2', title: 'Error 2' }]);  
  }, []);

  const renderItem = ({ item }: { item: ErrorFixItem }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ErrorFixDetail', { id: item.id })}
      style={{ padding: 20, borderBottomWidth: 1, borderColor: '#ccc' }}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default ErrorFixListScreen;
