import * as React from 'react';

import type { Locale } from '.';
import type { LocaleContextProps } from './context';
import LocaleContext from './context';
import defaultLocaleData from './en_US';

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

const useLocale = <C extends LocaleComponentName = LocaleComponentName>(
  componentName: C,
  defaultLocale?: Locale[C] | (() => Locale[C]),
): readonly [NonNullable<Locale[C]>, string] => {
  const legacyLocale = React.useContext<LocaleContextProps | undefined>(LocaleContext);

  const getLocale = React.useMemo<NonNullable<Locale[C]>>(() => {
    const locale = defaultLocale || defaultLocaleData[componentName];
    const localeFromContext = legacyLocale?.[componentName] ?? {};
    return {
      ...(typeof locale === 'function' ? locale() : locale),
      ...(localeFromContext || {}),
    };
  }, [componentName, defaultLocale, legacyLocale]);

  const getLocaleCode = () => {
    const localeCode = legacyLocale?.locale;
    // Had use LocaleProvide but didn't set locale
    if (legacyLocale?.exist && !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode!;
  };

  return [getLocale, getLocaleCode()] as const;
};

export default useLocale;
