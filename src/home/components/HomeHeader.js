import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Recently used:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
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

export default HomeHeader;
