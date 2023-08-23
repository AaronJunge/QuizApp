import React from 'react';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { getQuizById } from '../../redux/selectors';

const HomeQuiz = ({ id }) => {
  const navigation = useNavigation();
  const quiz = useSelector(state => getQuizById(state, id));
  console.log(id);
  return (
    <Pressable
      style={styles.item}
      onPress={() =>
        navigation.navigate('QuizStack', {
          screen: 'QuizStart',
          params: { id: quiz?.id },
        })
      }>
      <Text style={styles.itemTxt}>{quiz?.name}</Text>
      <Feather name="chevron-right" color="#000" size={22} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});

export default HomeQuiz;
