import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRoutes from 'navigation/AppRoutes';
import { colors } from 'theme';

LogBox.ignoreLogs(['new NativeEventEmitter()']);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.darkBackground,
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <AppRoutes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
