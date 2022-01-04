import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Spacer, Button, CustomBottomSheetTextInput } from 'components';
import { useUser, useApi } from 'hooks';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Пожалуйста, введите корректную почту')
    .required('Почта - обязательное поле'),
  password: yup
    .string()
    .min(8, ({ min }) => `Пароль должен содержать не менее  ${min} символов`)
    .required('Пароль - обязательное поле'),
});

export const LoginScreen: React.FC = () => {
  const { isServerConnected } = useApi();
  const { signIn } = useUser();

  const handleOnSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    signIn(email, password);
  };

  return (
    <BottomSheetScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always"
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={handleOnSubmit}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field
              component={CustomBottomSheetTextInput}
              name="email"
              placeholder="Почта"
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize="none"
              caretHidden={false}
            />
            <Spacer height={28} />
            <Field
              component={CustomBottomSheetTextInput}
              name="password"
              placeholder={'Пароль'}
              secureTextEntry
              returnKeyType="done"
              autoCapitalize="none"
              caretHidden={false}
            />
            <Spacer height={40} />
            <Button
              onPress={handleSubmit}
              title="Войти"
              disabled={!isValid || !isServerConnected}
            />
          </>
        )}
      </Formik>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 44,
    paddingHorizontal: 24,
    paddingBottom: 300,
  },
});
