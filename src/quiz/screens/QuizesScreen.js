import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import QuizHeader from '../components/QuizHeader';
import HomeQuiz from '../../home/components/HomeQuiz';

import { getQuizes } from '../../redux/selectors';


const QuizesScreen = () => {
  const quizes = useSelector(state => getQuizes(state));

  return (
    <View style={styles.container}>
      <FlatList
        data={quizes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={QuizHeader}
        ListEmptyComponent={HomeEmpty}
      />
    </View>
  );
};
const renderItem = ({ item }) => <HomeQuiz key={item.id} id={item.id} />;

const HomeEmpty = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyTxt}>No Quiz Found</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#001146',
  },
  item: {
    marginTop: 20,
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  itemTxt: {
    fontSize: 18,
    color: '#000',
  },
  emptyContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyTxt: {
    fontSize: 18,
    color: '#fff',
  },
});

export default QuizesScreen;
