import React, { useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { observer } from 'mobx-react';
import { useKeyboard } from '@react-native-community/hooks';
import { WELCOME, TABS, WelcomeScreen, PLAYER, PlayerScreen } from 'screens';
import { useUser, useApi } from 'hooks';
import { IAppRoutesProps } from 'models';

import BottomTabRoutes from './BottomTabRoutes';
import { commonOptions } from './options';

const AppStack = createStackNavigator<IAppRoutesProps>();

const playerScreenOptions: StackNavigationOptions = {
  headerShown: true,
  title: '',
};

const AppRoutes = () => {
  const keyboard = useKeyboard();
  const { isUserAuth } = useUser();
  const { init, isNetworkConnected, isServerError } = useApi();
  useEffect(() => {
    if (isNetworkConnected) {
      init();
    } else if (isNetworkConnected && isServerError) {
      Alert.alert('Ошибка', 'Сервис временно недоступен');
    } else {
      Alert.alert('Ошибка', 'Отсутствует интернет соединение');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNetworkConnected]);
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AppStack.Navigator
        initialRouteName={WELCOME}
        screenOptions={commonOptions}
      >
        {isUserAuth && !keyboard.keyboardShown ? (
          <>
            <AppStack.Screen name={TABS} component={BottomTabRoutes} />
            <AppStack.Screen
              name={PLAYER}
              component={PlayerScreen}
              options={playerScreenOptions}
            />
          </>
        ) : (
          <AppStack.Screen name={WELCOME} component={WelcomeScreen} />
        )}
      </AppStack.Navigator>
    </>
  );
};

export default observer(AppRoutes);
