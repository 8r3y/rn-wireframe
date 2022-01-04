import { NavigatorScreenParams } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { PLAYER, EVENT_STACK } from 'screens';

export enum VideoType {
  signTranslation = 'signTranslation',
  libretto = 'libretto',
}

/**
 * Root
 */
export type IAppRoutesProps = {
  WELCOME: undefined;
  TABS: undefined;
  PLAYER: { videoType: VideoType; uri: string; playId?: string } | undefined;
};

/**
 * Stacks
 */
export type IEventStackParamList = {
  EVENT: undefined;
};

export type IProfileStackParamList = {
  PROFILE: undefined;
};

/**
 * Tab Bar
 */
export type ITabParamList = {
  EVENT_STACK: NavigatorScreenParams<IEventStackParamList>;
  PROFILE_STACK: NavigatorScreenParams<IProfileStackParamList>;
};

/**
 * Navigatioin props
 */
export type IEventScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<ITabParamList, typeof EVENT_STACK>,
  StackNavigationProp<IAppRoutesProps, typeof PLAYER>
>;

/**
 * Screen props
 */
export type IPLayerScreenRouteProp = RouteProp<IAppRoutesProps, typeof PLAYER>;
