import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {
  Button,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { getRecentQuizById } from '../../redux/selectors';
import { addRecentQuizes } from '../../redux/actions';


const QuizScreen = ({ route, navigation }) => {
  const carouselRef = useRef();
  const dispatch = useDispatch();
  const id = route.params.id;
  const quiz = useSelector(state => getRecentQuizById(state, id));

  const { width } = useWindowDimensions();
  const [hideAnswer, setHideAnswer] = useState(false);

  const _toggleHideAnswer = () => setHideAnswer(prev => !prev);

  const _renderItem = ({ item, index }) => {
    const _handleSnapToNext = () => {
      if (index + 1 === quiz.flashcard.length) {
        navigation.navigate('Quizes');
      } else {
        carouselRef.current.snapToNext();
      }
    };
    const _handleAnswer = ans => {
      dispatch(
        addRecentQuizes({
          ...quiz,
          lastAnsweredQuestion: index + 1,
          answers: [...quiz.answers, { ...item, userAnswer: ans }],
        }),
      );

      _handleSnapToNext();
    };

    return (
      <View key={item.id} style={{ rowGap: 20 }}>
        <View style={styles.header}>
          <View style={styles.counter}>
            <Text style={styles.quizName}>
              {`${index + 1}/${quiz.flashcard.length}`}
            </Text>
          </View>
          <Text style={styles.quizName}>{quiz.name}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.questionTxt}>Question</Text>
          </View>
          <Text style={styles.question}>{item.question.value}</Text>
        </View>
        {!hideAnswer && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.questionTxt}>Answer</Text>
            </View>
            <Text style={styles.question}>{item.answer.value}</Text>
          </View>
        )}
        <Button
          title={hideAnswer ? 'Show Answer' : 'Hide Answer'}
          onPress={_toggleHideAnswer}
          color="#ae5eff"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            title="Correct"
            color="#007C01"
            onPress={() => _handleAnswer(true, item.id, index)}
          />
          <Button
            title="Incorrect"
            color="#A70000"
            onPress={() => _handleAnswer(false, item.id, index)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={quiz.flashcard}
        firstItem={quiz.lastAnsweredQuestion}
        renderItem={_renderItem}
        sliderWidth={width - 20}
        scrollEnabled={false}
        itemWidth={width - 20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 20,
    paddingVertical: 35,
    alignItems: 'center',
    backgroundColor: '#001146',
  },
  header: {
    columnGap: 10,
    flexDirection: 'row',
  },
  quizName: {
    color: '#fff',
    fontSize: 16,
  },
  counter: {
    paddingHorizontal: 7,
    borderRadius: 20,
    backgroundColor: '#b047e8',
  },
  card: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    borderColor: '#9999',
    backgroundColor: '#fff',
  },
  cardHeader: {
    paddingBottom: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    marginBottom: 10,
    borderColor: '#999',
  },
  questionTxt: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 18,
    marginHorizontal: 24,
  },
});


export default QuizScreen;
