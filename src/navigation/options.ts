import { StackNavigationOptions } from '@react-navigation/stack';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { colors } from 'theme';

export const commonOptions: StackNavigationOptions = {
  gestureEnabled: false,
  headerShown: false,
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerLeftContainerStyle: {
    paddingLeft: 5,
  },
  headerRightContainerStyle: {
    paddingRight: 5,
  },
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: colors.transparent,
  },
  headerTintColor: colors.textLightContent,
};

export const tabBarOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarItemStyle: {
    height: 42,
  },
  tabBarStyle: {
    position: 'absolute',
    height: 86,
    paddingTop: 24,
    paddingBottom: 24,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.lightBackground,
    borderColor: colors.transparent,
    shadowColor: colors.buttonPrimary,
    shadowOffset: {
      width: 0,
      height: -50,
    },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 25,
  },
  tabBarActiveTintColor: colors.tabActive,
  tabBarInactiveTintColor: colors.tabInactive,
};
