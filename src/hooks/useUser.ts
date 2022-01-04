import { useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import store from 'store';

export const useUser = () => {
  const userToken = store.userStore.userToken;
  const isUserAuth = store.userStore.isUserAuth;
  const login = store.userStore.login;
  const isUserHydrated = store.userStore.isUserHydrated;

  const signUp = async (email: string, password: string) => {
    try {
      await store.userStore.signUp(email, password);
      Keyboard.dismiss();
    } catch (e) {
      console.log('@SignUp - Error in request: ', e);
      const message = e.message ?? e;
      Alert.alert('Ошибка', message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await store.userStore.signIn(email, password);
      Keyboard.dismiss();
    } catch (e) {
      console.log('@SignIn - Error in request: ', e);
      const message = e.message ?? e;
      Alert.alert('Ошибка', message);
    }
  };

  const signOut = () => {
    store.userStore.singOut();
  };

  return {
    userToken,
    isUserAuth,
    isUserHydrated,
    signUp,
    signIn,
    signOut,
    login,
  };
};
