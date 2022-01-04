import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PROFILE, ProfileScreen } from 'screens';
import { IProfileStackParamList } from 'models';

import { commonOptions } from './options';

const ProfileStack = createStackNavigator<IProfileStackParamList>();

const ProfileRoutes = () => {
  return (
    <ProfileStack.Navigator screenOptions={commonOptions}>
      <ProfileStack.Screen name={PROFILE} component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileRoutes;
