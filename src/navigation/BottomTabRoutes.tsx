import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EVENT_STACK, PROFILE_STACK } from 'screens';
import {
  TicketIcon,
  TicketActiveIcon,
  ProfileIcon,
  ProfileActiveIcon,
} from 'assets/img';
import { ITabParamList } from 'models';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from 'theme';

import ProfileRoutes from './ProfileRoutes';
import EventRoutes from './EventRoutes';
import { tabBarOptions } from './options';

const Tab = createBottomTabNavigator<ITabParamList>();

const iconShadow = {
  shadowColor: colors.tabActive,
  shadowOffset: {
    width: 4,
    height: 8,
  },
  shadowOpacity: 0.35,
  shadowRadius: 10,
  elevation: 15,
};

const BottomTabRoutes = () => {
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ flex: 1, backgroundColor: colors.lightBackground }}
    >
      <Tab.Navigator screenOptions={tabBarOptions}>
        <Tab.Screen
          name={EVENT_STACK}
          component={EventRoutes}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <TicketActiveIcon style={iconShadow} />
              ) : (
                <TicketIcon />
              ),
            tabBarLabel: 'Спектакль',
          }}
        />
        <Tab.Screen
          name={PROFILE_STACK}
          component={ProfileRoutes}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <ProfileActiveIcon style={iconShadow} />
              ) : (
                <ProfileIcon />
              ),
            tabBarLabel: 'Профиль',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomTabRoutes;
