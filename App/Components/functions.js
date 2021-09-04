import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Image } from 'native-base';
const translator = TranslatorFactory.createTranslator();
export const postApi = (url, data) => {
    // let formdata = new FormData()
    // formdata.append("amount", this.state.amount)
    // formdata.append("paid_from", this.state.address)
    // formdata.append("paid_to", this.state.toAddress)
    // formdata.append("transaction_id", this.state.data.data)
    // formdata.append("coin_type", "USDT")
    return fetch(url,
        {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: data
        }).then((response) => response.json()).then(async (data) => {
            return data
        })
}
export const postApiwithToken = (url, data,token) => {
    // let formdata = new FormData()
    // formdata.append("amount", this.state.amount)
    // formdata.append("paid_from", this.state.address)
    // formdata.append("paid_to", this.state.toAddress)
    // formdata.append("transaction_id", this.state.data.data)
    // formdata.append("coin_type", "USDT")
    return fetch(url,
        {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token },
            body: data
        }).then((response) => response.json()).then(async (data) => {
            return data
        })
}

export const getApi=(url,token)=>{
    fetch(url, { 
        method: 'get', 
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }), 
        // body: 'A=1&B=2'
      }).then((response) => response.json()).then(async (data) => {
        return data
    })
}

export const generate_UUID = () => {

    let dt = new Date().getTime();

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {

        let r = (dt + Math.random() * 16) % 16 | 0;

        dt = Math.floor(dt / 16);

        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);

    });

};

export const languageTranslator=(lng,txt)=>{
  
    TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBY54m5k1-VQeAl3nw95pX79fnHp8_CqLg',lng,'en');
    const translator = TranslatorFactory.createTranslator();
    translator.translate(txt).then(translated => {
        //Do something with the translated text
        console.log(translated)
        return translated
        
    });
}