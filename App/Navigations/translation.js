import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
// import { translate } from '../Navigations/translation';
TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg','ar','en');
const translator = TranslatorFactory.createTranslator();

export const translate=(text)=>{
    translator.translate(text).then(translated => {
        //Do something with the translated text
        // console.log(translated)
        return translated
       
    }).catch(error=>{
        console.log(error)
    });
}