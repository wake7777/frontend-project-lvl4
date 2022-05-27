import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  const usernameMinCharsCount = 3;
  const usernameMaxCharsCount = 20;
  const passwordMinCharsCount = 6;
  return {
    loginFormSchema: yup.object({
      username: yup.string().trim().required(t('requiredField')),
      password: yup.string().required(t('requiredField')),
    }),
    messageFormSchema: yup.object({
      body: yup.string().trim().required(t('requiredField')),
    }),
    channelFormSchema: (channelsNames) => yup.object().shape({
      name: yup
        .string()
        .required(t('requiredField'))
        .notOneOf(channelsNames, t('mustBeUnique'))
        .min(usernameMinCharsCount, t('fromToChars', { min: usernameMinCharsCount, max: usernameMaxCharsCount }))
        .max(usernameMaxCharsCount, t('fromToChars', { min: usernameMinCharsCount, max: usernameMaxCharsCount })),
    }),
    signupFormSchema: yup.object().shape({
      username: yup
        .string()
        .required(t('requiredField'))
        .min(usernameMinCharsCount, t('fromToChars', { min: usernameMinCharsCount, max: usernameMaxCharsCount }))
        .max(usernameMaxCharsCount, t('fromToChars', { min: usernameMinCharsCount, max: usernameMaxCharsCount })),
      password: yup
        .string()
        .required(t('requiredField'))
        .min(passwordMinCharsCount, t('atLeastChars', { min: passwordMinCharsCount })),
      confirmPassword: yup
        .string()
        .required(t('requiredField'))
        .oneOf([yup.ref('password'), null], t('passwordsMustMatch')),
    }),
  };
};
