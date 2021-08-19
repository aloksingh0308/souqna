import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
// Localization.ts code can be found here: https://gist.github.com/naishe/a6d9ea9d23214875ac176b63387ab833
// import './localization';
import {useTranslation,Trans} from 'react-i18next';

// declare const global: {HermesInternal: null | {}};

const hello='green'

const Test = () => {
  const {t} = useTranslation()

  return (
    <>
    {/* <Trans>hello</Trans>
     */}
     <Text>{t('hello')}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Test;