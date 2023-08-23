import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeTabBar from './HomeTabBar';
import HomeScreen from '../../home/screens/HomeScreen';
import CreateQuizScreen from '../../home/screens/CreateQuizScreen';
import QuizStack from '../../quiz/screens/QuizStack';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, unmountOnBlur: true }}
      tabBar={renderTabBar}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="CreateQuiz" component={CreateQuizScreen} />
      <Tab.Screen name="QuizStack" component={QuizStack} />
    </Tab.Navigator>
  );
};

const renderTabBar = props => <HomeTabBar {...props} />;

export default AppNavigation;
