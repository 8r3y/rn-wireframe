import React, { useRef, useMemo, useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { observer } from 'mobx-react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  TabView,
  TabBar,
  SceneMap,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import { BottomSheetBackground } from 'components';
import { colors, typography } from 'theme';
import { useUser } from 'hooks';
import { PatternImage } from 'assets/img';

import { LoginScreen } from '../auth/Login';
import { Registration } from '../auth/Registration';

const { height } = Dimensions.get('window');

const renderScene = SceneMap({
  registration: Registration,
  login: LoginScreen,
});

type TabBarRendererProps = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string;
    title: string;
  }>;
};

const Welcome: React.FC = () => {
  const { isUserAuth, isUserHydrated } = useUser();
  const layout = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [375, 500], []);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);

  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'registration', title: 'Регистрация' },
    { key: 'login', title: 'Вход' },
  ]);

  useEffect(() => {
    if (isUserHydrated) {
      SplashScreen.hide();
    }
  }, [isUserHydrated]);

  const handleTabIndexChanges = (tabIdx: number) => {
    const newBottomSheetIndex = tabIdx === 0 ? 1 : 0;
    setIndex(tabIdx);
    setBottomSheetIndex(newBottomSheetIndex);
  };

  const onStart = () => {
    setBottomSheetIndex(0);
  };

  const renderTabBar = (props: TabBarRendererProps) => (
    <TabBar
      {...props}
      activeColor={colors.tabActive}
      inactiveColor={colors.tabInactive}
      indicatorStyle={{ backgroundColor: colors.tabActive }}
      labelStyle={{
        textTransform: 'capitalize',
        fontFamily: typography.fontFamilies.medium,
        fontSize: typography.fontSizes.medium[0],
        lineHeight: typography.fontSizes.medium[1],
      }}
      style={{ backgroundColor: colors.transparent }}
    />
  );

  return (
    <ImageBackground
      source={isUserHydrated && !isUserAuth ? PatternImage : null}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <BottomSheet
            backgroundComponent={(props) => (
              <BottomSheetBackground {...props} />
            )}
            handleComponent={() => <View />}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={false}
            enablePanDownToClose={false}
            enableOverDrag={false}
            ref={bottomSheetRef}
            index={bottomSheetIndex}
            snapPoints={snapPoints}
            keyboardBehavior="fillParent"
            keyboardBlurBehavior="restore"
          >
            <BottomSheetView style={{ paddingTop: 20, height: layout.height }}>
              <TabView
                navigationState={{ index, routes }}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={handleTabIndexChanges}
                keyboardDismissMode="none"
                initialLayout={{ height: layout.height, width: layout.width }}
              />
            </BottomSheetView>
          </BottomSheet>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: 375,
    backgroundColor: colors.darkBackground,
  },
  safeArea: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
});

export default observer(Welcome);
