// @ts-check

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  useEffect(() => {
    const h1 = document.querySelector('h1');
    document.title = [h1 && h1.innerText, t('title')]
      .filter((v) => v)
      .join(' | ');
  });
};
