import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EVENT, EventScreen } from 'screens';
import { IEventStackParamList } from 'models';

import { commonOptions } from './options';

const EventStack = createStackNavigator<IEventStackParamList>();

const EventRoutes = () => {
  return (
    <EventStack.Navigator screenOptions={commonOptions}>
      <EventStack.Screen name={EVENT} component={EventScreen} />
    </EventStack.Navigator>
  );
};

export default EventRoutes;
