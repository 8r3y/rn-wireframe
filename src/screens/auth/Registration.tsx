import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Spacer, Button, Typography } from 'components';
import { colors } from 'theme';
import { useUser, useApi } from 'hooks';

import Input from './CustomBottomSheetTextInput';

const registrationValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Пожалуйста, введите корректную почту')
    .required('Почта - обязательное поле'),
  password: yup
    .string()
    .matches(/\w*[a-z-а-я]\w*/, 'Пароль должен содержать прописные буквы')
    .matches(/\w*[A-Z-А-Я]\w*/, 'Пароль должен содержать заглавные буквы')
    .matches(/\d/, 'Пароль должен содержать цифры')
    .min(8, ({ min }) => `Пароль должен содержать не менее ${min} символов`)
    .required('Пароль - обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтвердите пароль - обязательное поле'),
});

export const Registration: React.FC = () => {
  const { isServerConnected } = useApi();
  const { signUp } = useUser();

  const handleOnPressTos = () => {};

  const handleOnSubmit = ({
    email,
    confirmPassword,
  }: {
    email: string;
    confirmPassword: string;
  }) => {
    signUp(email, confirmPassword);
  };

  return (
    <BottomSheetScrollView
      contentContainerStyle={styles.container}
      nestedScrollEnabled
      keyboardShouldPersistTaps="always"
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <Formik
        validationSchema={registrationValidationSchema}
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={handleOnSubmit}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field
              component={Input}
              name="email"
              placeholder="Почта"
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize="none"
              caretHidden={false}
            />
            <Spacer height={28} />
            <Field
              component={Input}
              name="password"
              placeholder="Пароль"
              secureTextEntry
              returnKeyType="next"
              autoCapitalize="none"
              caretHidden={false}
            />
            <Spacer height={28} />
            <Field
              component={Input}
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              returnKeyType="done"
              autoCapitalize="none"
              caretHidden={false}
            />
            <Spacer height={40} />
            <Button
              onPress={handleSubmit}
              title="Зарегистрироваться"
              disabled={!isValid || !isServerConnected}
            />
            <Spacer height={28} />
            <Typography
              size="small"
              color={colors.textGrey}
              style={styles.text}
            >
              {'Нажимая “Зарегистрироваться”, вы принимаете'}
            </Typography>
            <Typography
              suppressHighlighting={false}
              onPress={handleOnPressTos}
              size="link"
              color={colors.link}
              style={styles.text}
            >
              {'Политику конфиденциальности'}
            </Typography>
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
  text: {
    width: '100%',
    textAlign: 'center',
  },
});
