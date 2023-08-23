import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const HomeTabBar = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.name}
            style={styles.item}
            onPress={onPress}
            onLongPress={onLongPress}>
            {isFocused ? ICONS[index][1] : ICONS[index][0]}
          </Pressable>
        );
      })}
    </View>
  );
};

const ICONS = {
  0: [
    <Feather name="home" color="#d1d1d1" size={28} />,
    <Feather name="home" color="#fff" size={28} />,
  ],
  1: [
    <Feather name="plus" color="#d1d1d1" size={28} />,
    <Feather name="plus" color="#fff" size={28} />,
  ],
  2: [
    <Feather name="bookmark" color="#d1d1d1" size={28} />,
    <Feather name="bookmark" color="#fff" size={28} />,
  ],
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#b047e8',
  },
  item: {
    flex: 1,
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    marginTop: 5,
    color: '#000',
  },
  activeTxt: {
    marginTop: 5,
    color: '#ae5eff',
  },
});

export default HomeTabBar;
