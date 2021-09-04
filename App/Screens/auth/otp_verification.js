import React, { Component, createRef } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, Image } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../Components/colors";
import { texts } from "../../Components/textfile";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const firstTextInputRef = createRef(null);
const secondTextInputRef = createRef(null);
const thirdTextInputRef = createRef(null);
const fourthTextInputRef = createRef(null);

class VerifyOtp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            otpArray: [],
            timer: 10
        }
    }

    componentDidMount() {

        setInterval(() => {
            if (this.state.timer > 0) {
                this.setState({ timer: this.state.timer - 1 })
            }
        }, 1000)

    }

    onOtpChange = index => {
        return value => {
            if (isNaN(Number(value))) {
                // do nothing when a non digit is pressed
                return;
            }
            const otpArrayCopy = this.state.otpArray.concat();
            otpArrayCopy[index] = value;
            this.setState({ otpArray: otpArrayCopy })
            // console.log(otpArrayCopy)

            // auto focus to next InputText if value is not blank
            if (value !== '') {
                if (index === 0) {
                    secondTextInputRef.current.focus();
                } else if (index === 1) {
                    thirdTextInputRef.current.focus();
                } else if (index === 2) {
                    fourthTextInputRef.current.focus();
                }
            }

        };
    };

    onDelete = index => {
        // console.log(index)
        return ({ nativeEvent: { key: value } }) => {
            if (value === 'Backspace' && this.state.otpArray[index] === '') {
                if (index === 1) {
                    firstTextInputRef.current.focus();
                } else if (index === 2) {
                    secondTextInputRef.current.focus();
                } else if (index === 3) {
                    thirdTextInputRef.current.focus();
                }
            }
            if (index > 0) {
                const otpArrayCopy = this.state.otpArray.concat();
                otpArrayCopy[index] = '';
                this.setState({ otpArray: otpArrayCopy })
                // console.log(otpArrayCopy)

            }
        }

        // }
    };

    onVerify = () => {
        const { otpArray } = this.state
        if (otpArray.length == 4) {
            let otp = ''
            this.state.otpArray.map((item) => {
                otp = otp + item
            })
            // console.log(otp)
            alert(otp)
        }
    }

    render() {
        return (
            // <ScrollView >
            <SafeAreaView style={{ width: wp('100%'), height: hp('100%') }}>
                <View style={{ width: '100%', height: hp('38%'), justifyContent: 'center', alignItems: 'center' }}>
                    {/* <View style={{width:'100%',height:200}}></View> */}
                    <Image source={require('../../Assets/mobile_verfi.png')} style={{ width: '60%', height: '90%', resizeMode: 'contain' }} />
                </View>
                <View style={{ width: '100%', height: hp('27%'), alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={texts.HEADING_TEXT}>OTP Verification</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={texts.NORMAL_TEXT}>Enter the OTP sent to +91-9793081102.</Text>
                        <TouchableOpacity>
                            <Text style={[texts.SUBHEADING_TEXT, { paddingHorizontal: '2%' }]}>Change ?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', width: '70%', justifyContent: 'space-around' }}>
                        {[
                            firstTextInputRef,
                            secondTextInputRef,
                            thirdTextInputRef,
                            fourthTextInputRef
                        ].map((textInputRef, index) => (
                            <View key={index}
                                style={{ width: 50, height: 50, borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginVertical: '10%' }}>
                                <TextInput

                                    placeholder='*'
                                    maxLength={1}
                                    onChangeText={this.onOtpChange(index)}
                                    keyboardType='decimal-pad'
                                    ref={textInputRef}
                                    onKeyPress={this.onDelete(index)}
                                    // onBackSpace={()=>this.onBackSpace(index)}
                                    onB
                                    style={{
                                        textAlign: 'center'
                                        // paddingHorizontal: 10,
                                        // paddingVertical: 10,
                                        // borderWidth: 1
                                    }}
                                />
                            </View>
                        ))
                        }
                    </View>
                    <Text style={texts.SUBHEADING_TEXT}>00:{this.state.timer}</Text>
                </View>
                <View style={{ width: '100%', height: hp('30%'), justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={texts.NORMAL_TEXT}>Don't Receive the OTP ?</Text>

                        <TouchableOpacity onPress={() => this.setState({ timer: 45 })} >
                            <Text style={[texts.SUBHEADING_TEXT, { paddingHorizontal: '2%', color: colors.PRIMARY_COLOR }]}>RESEND OTP</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.replace('DrawerNav', { screen: 'Home' })}
                        style={{ width: '70%', backgroundColor: colors.TEXT_COLOR, alignItems: 'center', alignSelf: 'center', borderRadius: 10, marginVertical: '10%', top: '5%' }}>
                        <Text style={[texts.SUBHEADING_TEXT, { paddingVertical: '5%', color: '#fff' }]}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            // </ScrollView>
        )
    }
}
export default VerifyOtp