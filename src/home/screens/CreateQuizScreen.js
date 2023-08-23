import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { useForm, useFieldArray } from 'react-hook-form';

import FormInput from '../components/FormInput';
import { addQuiz } from '../../redux/actions';
import { getQuizById } from '../../redux/selectors';

const CreateQuizScreen = ({ route }) => {
  const id = route.params?.id;
  const quiz = useSelector(state => getQuizById(state, id));

  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: quiz
      ? quiz
      : {
          name: '',
          flashcard: [
            { id: 0, question: { value: '' }, answer: { value: '' } },
          ],
        },
  });


  useEffect(() => {
    if (quiz) {
      reset(quiz);
    }

  }, [quiz]);

  const { fields, append } = useFieldArray({
    control,
    name: 'flashcard',
  });

  const onSubmit = values => {
    const newItemId = 'id' + Math.random().toString(16).slice(2);

    if (values.name) {
      dispatch(addQuiz({ ...values, id: id ? id : newItemId }));
    } else {
      Alert.alert('Alert', 'Please fill the form');
    }
    reset();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 35 }}
        showsVerticalScrollIndicator={false}>
        <FormInput placeholder="Enter Set Name" name="name" control={control} />
        <View style={styles.dynamicFormContainer}>
          {fields.map((f, i) => (
            <View key={f.id} style={styles.formItem}>
              <Text style={{ color: 'white' }}>Flashcard {i + 1}:</Text>
              <FormInput
                placeholder="Question"
                name={`flashcard.${i}.question.value`}
                control={control}
              />
              <FormInput
                placeholder="Answer"
                name={`flashcard.${i}.answer.value`}
                control={control}
              />
            </View>
          ))}
        </View>
        <Button
          title="Add Flashcard"
          onPress={() =>
            append({
              id: fields.length + 1,
              question: { value: '' },
              answer: { value: '' },
            })
          }
        />
      </ScrollView>
      <View style={styles.btn}>
        <Button title="Save" color="#ae5eff" onPress={handleSubmit(onSubmit)} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#001146',
    justifyContent: 'space-between',
  },
  settingsBtn: {
    alignSelf: 'flex-end',
    paddingLeft: 20,
    paddingVertical: 20,
  },
  titleTxt: {
    color: '#fff',
    fontSize: 24,
  },
  dynamicFormContainer: {
    rowGap: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  formItem: {
    rowGap: 10,
  },
  btn: {
    paddingHorizontal: 80,
    paddingVertical: 10,
  },
});

export default CreateQuizScreen;
