import i18n, {
    LanguageDetectorAsyncModule,
    Services,
    InitOptions,
  } from 'i18next';
  import {initReactI18next} from 'react-i18next';
  import AsyncStorage from '@react-native-community/async-storage';
  import * as RNLocalize from 'react-native-localize';

 
  
  const languageDetector: LanguageDetectorAsyncModule = {
    type: 'languageDetector',
    // If this is set to true, your detect function receives a callback function that you should call with your language,
    //useful to retrieve your language stored in AsyncStorage for example
    async: true,
    init: (
      _services: Services,
      _detectorOptions: object,
      _i18nextOptions: InitOptions,
    ) => {
      /* use services and options */
    },
    detect: (callback: (lng: string) => void) => {
    //   AsyncStorage.getItem('APP_LANG', (err, lng) => {
    //     // Error fetching stored data or no language was stored
    //     if (err || !lng) {
    //       if (err) {
    //         console.log('Error fetching "APP_LANG" from async store', err);
    //       } else {
    //         console.log(
    //           'No language is set, choosing the best available or English as fallback',
    //         );
    //       }
    //       const bestLng = RNLocalize.findBestAvailableLanguage(['en', 'hi']);
  
    //       callback(bestLng?.languageTag ?? 'en');
    //       return;
    //     }
        // callback(lng);
    //   });
    return callback(RNLocalize.getLocales()[0].languageCode);
    },
    cacheUserLanguage: (lng: string) => {
      AsyncStorage.setItem('APP_LANG', lng);
    },
  };
  
  i18n
    .use(languageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: 'en',
        debug: true,
        react: {
                useSuspense: false,
              },
              defaultNS:'translations',
              ns:'translations',
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        }
    //   resources: {
    //     en: {
    //       translation: {
    //         'Welcome to React': 'Welcome to React and react-i18next',
    //       },
    //     },
    //     hi: {
    //       translation: {
    //         'Welcome to React': '????????????????????? ????????? ?????????????????????-?????? ?????? ??????  ????????? ???????????? ?????????????????? ??????',
    //       },
    //     },
    //   },
    //   react: {
    //     useSuspense: false,
    //   },
    //   interpolation: {
    //     escapeValue: false,
    //   },
    });