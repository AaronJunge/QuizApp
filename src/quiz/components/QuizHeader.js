import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const QuizHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Saved Quizes:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
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
});

export default QuizHeader;
