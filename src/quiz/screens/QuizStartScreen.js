import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getQuizById as getQuizById, getRecentQuizById as getRecentQuizById } from '../../redux/selectors';
import { addRecentQuizes } from '../../redux/actions';


const QuizStartScreen = ({ route, navigation }) => {
  const id = route.params.id;
  const dispatch = useDispatch();
  const quiz = useSelector(state => getQuizById(state, id));
  const isRecentQuiz = useSelector(state => getRecentQuizById(state, id));

  const _handleStartPress = () => {
    if (!isRecentQuiz) {
      dispatch(
        addRecentQuizes({
          ...quiz,
          answers: [],
          lastAnsweredQuestion: 0,
        }),
      );
    }
    navigation.navigate('Quiz', { id: id });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.titleTxt}>{quiz?.name}</Text>
          <Text
            style={
              styles.descTxt
            }>{`Total number of cards: ${quiz?.flashcard.length}`}</Text>
        </View>
        <View style={styles.btnsContainer}>
          <Button
            title={isRecentQuiz ? 'Resume Quiz' : 'Start Quiz'}
            color="#ae5eff"
            onPress={_handleStartPress}
          />
        </View>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('CreateQuiz', { id: id })}>
          <Feather name="edit" size={14} color="#fff" />
          <Text style={styles.editTxt}>Edit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#001146',
  },
  content: {
    flexGrow: 1,
    rowGap: 15,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 35,
  },
  titleTxt: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
  },
  descTxt: {
    fontSize: 14,
    color: '#000',
  },
  btnsContainer: {
    paddingHorizontal: 80,
    paddingVertical: 10,
  },
  editBtn: {
    columnGap: 10,
    borderRadius: 4,
    paddingVertical: 7,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    backgroundColor: '#006D01',
  },
  editTxt: {
    fontSize: 14,
    color: '#fff',
  },
});

export default QuizStartScreen;
