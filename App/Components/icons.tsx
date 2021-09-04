import React from 'react'
import Svg, { Path, G, Rect, Line, Ellipse } from 'react-native-svg'

interface IconProps {
    color?: string,
    height?: number,
    width?: number
}

export const HomeIcons = (props, { color = props.color, height = 40, width = 40 }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 43.09 44.997">
            <Path id="_290149_building_estate_home_house_real_icon" data-name="290149_building_estate_home_house_real_icon" d="M44.715,23.711a.975.975,0,0,1-1.381,0L34.4,14.773a1.019,1.019,0,0,1-.17-.171L30.4,10.773a1.019,1.019,0,0,1-.17-.171L24,4.377,4.667,23.711A.977.977,0,0,1,3.286,22.33l19.905-19.9a.935.935,0,0,1,.094-.144,1.05,1.05,0,0,1,1.43,0,.925.925,0,0,1,.1.144L30,7.616V5h0a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v8.619l8.715,8.714A.977.977,0,0,1,44.715,23.711ZM34,6H32V9.616l2,2ZM10,22a1,1,0,0,1,1,1V42a2,2,0,0,0,2,2h6V31a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1V44h6a2,2,0,0,0,2-2V23a1,1,0,0,1,2,0V42a4,4,0,0,1-4,4H13a4,4,0,0,1-4-4V23A1,1,0,0,1,10,22ZM27,44V32H21V44h6Z" transform="translate(-2.41 -1.5)" fill={color} stroke={color} stroke-width="1" fill-rule="evenodd" />
        </Svg>

    )
}
export const CarIcons = (props, { color = props.color, height = 40, width = 40 }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="46" height="38" viewBox="0 0 46 38">
            <G id="_6646160_add_and_car_plus_transport_icon" data-name="6646160_add_and_car_plus_transport_icon" transform="translate(0 -5)">
                <Path id="Path_3264" data-name="Path 3264" d="M33.228,16.23H4L6.923,9.507A5.774,5.774,0,0,1,12.184,6H24.9a6.149,6.149,0,0,1,5.407,3.507Z" transform="translate(1.384 0)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" />
                <Path id="Path_3265" data-name="Path 3265" d="M10.768,23H2v2.923a2.931,2.931,0,0,0,2.923,2.923H7.846a2.931,2.931,0,0,0,2.923-2.923Z" transform="translate(0.461 7.844)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" />
                <Line id="Line_10" data-name="Line 10" x2="4.969" transform="translate(1 14.768)" fill={color} stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" />
                <Line id="Line_11" data-name="Line 11" x2="5" transform="translate(34 14)" fill={color} stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" />
                <Line id="Line_12" data-name="Line 12" x2="4" transform="translate(5 24)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" />
                <Ellipse id="Ellipse_246" data-name="Ellipse 246" cx="10.5" cy="11" rx="10.5" ry="11" transform="translate(24 20)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" />
                <Line id="Line_13" data-name="Line 13" y2="8" transform="translate(34 27)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" />
                <Line id="Line_14" data-name="Line 14" x2="9" transform="translate(30 31)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" />
                <Path id="Path_3266" data-name="Path 3266" d="M21.568,20.608A2.761,2.761,0,0,0,18.938,19H13.823a2.761,2.761,0,0,0-2.631,1.608L9,24.846" transform="translate(3.691 5.998)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" />
                <Path id="Path_3267" data-name="Path 3267" d="M24.383,27.614H3.923A2.931,2.931,0,0,1,1,24.691V18.846A5.863,5.863,0,0,1,6.846,13H33.151A5.883,5.883,0,0,1,39,18.407" transform="translate(0 3.23)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" />
            </G>
        </Svg>

    )
}
export const ElectronicsIcons = ({ color = 'red', height = 40, width = 40 }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 26.224 52.471">
            <Path id="Icon_ionic-ios-phone-portrait" data-name="Icon ionic-ios-phone-portrait" d="M32.577,2.25H14A3.854,3.854,0,0,0,10.125,6.1V50.727A3.968,3.968,0,0,0,14,54.721H32.566a3.89,3.89,0,0,0,3.783-3.994V6.1A3.758,3.758,0,0,0,32.577,2.25ZM21.486,4.944H25a.468.468,0,1,1,0,.937H21.486a.468.468,0,1,1,0-.937ZM23.3,52.964a2.038,2.038,0,1,1,2.038-2.038A2.039,2.039,0,0,1,23.3,52.964Zm10.951-5.739H12.233A.235.235,0,0,1,12,46.991V8.457a.235.235,0,0,1,.234-.234H34.252a.235.235,0,0,1,.234.234V46.991A.235.235,0,0,1,34.252,47.225Z" transform="translate(-10.125 -2.25)" fill="#0e3147" />
        </Svg>


    )
}
export const FurnitureIcons = (props,{ color = props.color, height = 40, width = 40 }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="40px" viewBox="0 0 24 24" width="40px" fill={color}>
            <G>
                <Path d="M0,0h24v24H0V0z" fill="none" />
            </G>
            <G>
                <Path d="M20,8V6c0-1.65-1.35-3-3-3H7C5.35,3,4,4.35,4,6v2c-1.65,0-3,1.35-3,3v5c0,1.65,1.35,3,3,3v1c0,0.55,0.45,1,1,1 c0.55,0,1-0.45,1-1v-1h12v1c0,0.55,0.45,1,1,1c0.55,0,1-0.45,1-1v-1c1.65,0,3-1.35,3-3v-5C23,9.35,21.65,8,20,8z M6,6 c0-0.55,0.45-1,1-1h10c0.55,0,1,0.45,1,1v2.78c-0.61,0.55-1,1.34-1,2.22v2H7v-2c0-0.88-0.39-1.67-1-2.22V6z M21,16 c0,0.55-0.45,1-1,1H4c-0.55,0-1-0.45-1-1v-5c0-0.55,0.45-1,1-1s1,0.45,1,1v4h14v-4c0-0.55,0.45-1,1-1s1,0.45,1,1V16z" />
            </G>
        </Svg>
    )
}
export const RestaurantIcons = ({ color = 'red', height = 40, width = 40 }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="27.543" height="32.644" viewBox="0 0 27.543 32.644">
            <Path id="Icon_metro-spoon-fork" data-name="Icon metro-spoon-fork" d="M9.655,1.928c-3.38,0-6.121,3.2-6.121,7.141,0,3.377,2.009,6.206,4.709,6.95L7.23,32.536a1.9,1.9,0,0,0,1.915,2.036h1.02a1.9,1.9,0,0,0,1.915-2.036L11.068,16.018c2.7-.744,4.709-3.573,4.709-6.95,0-3.944-2.74-7.141-6.121-7.141Zm20.573,0-1.7,10.2H27.253l-.85-10.2h-.85l-.85,10.2H23.427l-1.7-10.2h-.85V15.19a1.02,1.02,0,0,0,1.02,1.02h2.657l-1,16.326a1.9,1.9,0,0,0,1.915,2.036h1.02A1.9,1.9,0,0,0,28.4,32.536l-1-16.326h2.657a1.02,1.02,0,0,0,1.02-1.02V1.928Z" transform="translate(-3.535 -1.928)" fill="#0e3147" />
        </Svg>
    )
}
export const MenIcons = ({ color = 'red', height = 40, width = 40 }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="58.021" height="41.785" viewBox="0 0 58.021 41.785">
            <Path id="_1076728_clothes_t-shirt_men_shopping_shirt_icon" data-name="1076728_clothes_t-shirt_men_shopping_shirt_icon" d="M66.091,134.542l-14.27-13.694a1.117,1.117,0,0,0-.773-.31h-5.03a1.118,1.118,0,0,0-1.082,1.4,7.039,7.039,0,1,1-13.614,0,1.116,1.116,0,0,0-1.081-1.4H24.83a1.117,1.117,0,0,0-.79.327L9.763,135.142a1.117,1.117,0,0,0,0,1.58l6.506,6.505a1.118,1.118,0,0,0,1.58,0l5.959-5.959v22.939a1.117,1.117,0,0,0,1.117,1.117H50.719a1.117,1.117,0,0,0,1.117-1.117V137.267l5.959,5.959a1.15,1.15,0,0,0,1.58,0l6.505-6.505a1.114,1.114,0,0,0,.251-.383l.228-.582A1.116,1.116,0,0,0,66.091,134.542Zm-7.506,6.314-7.076-7.075a1.117,1.117,0,0,0-1.907.789v24.518H26.042V134.571a1.117,1.117,0,0,0-1.907-.789l-7.076,7.075-4.926-4.926,13.16-13.159h3.613a8.874,8.874,0,0,0-.049.924,9.273,9.273,0,0,0,18.547,0,8.9,8.9,0,0,0-.05-.924H50.6l13.3,12.766Z" transform="translate(-8.936 -120.038)" fill="#002e4b" stroke="#002e4b" stroke-width="1" />
        </Svg>
    )
}
export const WomenIcons = ({ color = 'red', height = 40, width = 40 }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 39.519 42.56">
            <G id="_x30_4" transform="translate(-3 -2)">
                <Path id="Path_3268" data-name="Path 3268" d="M41,35.439H31.85a1.521,1.521,0,0,1-1.514-1.659l1.532-16.72a1.52,1.52,0,0,1,3.028.278L33.515,32.4h5.8c-.373-3.575-1.21-11.821-1.361-15.131-.068-1.507,0-4.36,0-4.48A6.176,6.176,0,0,0,36.1,8.4,33.425,33.425,0,0,0,31.33,5.7l-.316,1.233c-.582,1.746-2.255,4.183-4.6,4.183H18.924c-2.351,0-4.023-2.437-4.573-4.076l-.356-1.387A30.814,30.814,0,0,0,9.233,8.214,6.192,6.192,0,0,0,7.385,12.64c.006.006.254,3.078.184,4.629C7.417,20.578,6.58,28.824,6.208,32.4h5.609L10.438,17.339a1.52,1.52,0,0,1,3.028-.278L15,33.781a1.521,1.521,0,0,1-1.514,1.659H4.52a1.519,1.519,0,0,1-1.511-1.682c.013-.125,1.336-12.529,1.523-16.627C4.584,16,4.418,13.6,4.349,12.764A9.267,9.267,0,0,1,7.091,6.057c1.158-1.15,5.885-3.3,7.307-3.926a1.519,1.519,0,0,1,2.088,1.012l.778,3.04c.325.954,1.211,1.9,1.66,1.9H26.41c.448,0,1.334-.943,1.691-2l.747-2.933a1.52,1.52,0,0,1,2.124-1C32.388,2.82,37.1,5.1,38.244,6.241a9.344,9.344,0,0,1,2.745,6.582c0,.064-.065,2.9,0,4.307.187,4.1,1.51,16.5,1.523,16.627A1.519,1.519,0,0,1,41,35.439Z" transform="translate(0 0)" fill="#002e4b" />
                <Path id="Path_3269" data-name="Path 3269" d="M32.84,33.64a1.509,1.509,0,0,1-.481-.078L28.94,32.423a2.093,2.093,0,0,0-1.321,0l-2,.667a5.092,5.092,0,0,1-3.917-.278,2.144,2.144,0,0,0-1.958-.044,5.166,5.166,0,0,1-4,.322l-2-.667a2.093,2.093,0,0,0-1.321,0L9,33.562a1.52,1.52,0,0,1-1.971-1.74l1.52-7.6a1.52,1.52,0,0,1,2.981.6L10.524,29.85l.934-.311a5.161,5.161,0,0,1,3.245,0l2,.667a2.076,2.076,0,0,0,1.6-.114,5.206,5.206,0,0,1,4.677-.044,2.136,2.136,0,0,0,1.683.157l2-.667a5.161,5.161,0,0,1,3.245,0l.934.311L29.83,24.818a1.52,1.52,0,0,1,2.981-.6l1.52,7.6A1.52,1.52,0,0,1,32.84,33.64Z" transform="translate(2.08 10.919)" fill="#002e4b" />
            </G>
        </Svg>


    )
}
export const MakeupIcons = ({ color = 'red', height = 40, width = 40 }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="47.959" height="43.531" viewBox="0 0 47.959 43.531">
            <G id="Layer_4" transform="translate(-0.021 -2.235)">
                <G id="Group_3751" data-name="Group 3751">
                    <Path id="Path_3285" data-name="Path 3285" d="M39.149,16.572A14.338,14.338,0,1,0,23.141,30.8v5.8H21.948v9.164h5.728V36.6H26.483V30.8A14.332,14.332,0,0,0,39.149,16.572ZM24.9,28.68A12.057,12.057,0,1,1,36.953,16.623,12.057,12.057,0,0,1,24.9,28.68Z" fill="#002e4b" />
                    <Path id="Path_3286" data-name="Path 3286" d="M7.822,22.66a4.639,4.639,0,0,1-1.328-2.744l-.011-.01-.018.014A4.646,4.646,0,0,1,2.4,23.983L2.388,24l.012.012a4.641,4.641,0,0,1,4.071,4.072l.013.012.011-.012a4.643,4.643,0,0,1,4.072-4.072l.01-.012-.011-.012A4.622,4.622,0,0,1,7.822,22.66Z" fill="#002e4b" />
                    <Path id="Path_3287" data-name="Path 3287" d="M3.046,18.577l.008-.009A3.431,3.431,0,0,1,6.062,15.56l.008-.008-.008-.008a3.428,3.428,0,0,1-3.008-3.008l-.008-.009-.013.012a3.417,3.417,0,0,1-.98,2.021,3.421,3.421,0,0,1-2.021.981l-.011.011.009.008a3.43,3.43,0,0,1,2.026.982,3.424,3.424,0,0,1,.98,2.026Z" fill="#002e4b" />
                    <Path id="Path_3288" data-name="Path 3288" d="M47.965,32.676a5.479,5.479,0,0,1-4.81-4.809l-.014-.014-.021.02a5.48,5.48,0,0,1-4.8,4.8l-.018.021.014.013a5.487,5.487,0,0,1,4.807,4.81l.016.014.014-.014a5.486,5.486,0,0,1,4.81-4.81l.014-.013Z" fill="#002e4b" />
                    <Path id="Path_3289" data-name="Path 3289" d="M34.881,14.392,22.616,26.658a15.992,15.992,0,0,0,2.753.4c.3-.011.594-.021.886-.056l9.006-9.007A10.016,10.016,0,0,0,34.881,14.392Z" fill="#002e4b" />
                    <Path id="Path_3290" data-name="Path 3290" d="M31.876,9.766,17.963,23.678a12.435,12.435,0,0,0,2.119,1.866L33.73,11.894A11.206,11.206,0,0,0,31.876,9.766Z" fill="#002e4b" />
                </G>
            </G>
        </Svg>
    )
}
export const CompanyIcons = ({ color = 'red', height = 40, width = 40 }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="34.344" height="42.425" viewBox="0 0 34.344 42.425">
            <G id="_4213476_apartment_architecture_building_city_company_icon" data-name="4213476_apartment_architecture_building_city_company_icon" transform="translate(-13 -1)">
                <Path id="Path_3270" data-name="Path 3270" d="M47.344,40.731H42.63V1H17.714V27.263H13v2.694h7.407V3.694H39.936V40.731H20.407V32.987H17.714v7.744H13v2.694H47.344Z" fill="#002e4b" />
                <Rect id="Rectangle_2907" data-name="Rectangle 2907" width="1.715" height="3.429" transform="translate(25.002 9.573)" fill="#002e4b" />
                <Rect id="Rectangle_2908" data-name="Rectangle 2908" width="1.715" height="3.429" transform="translate(33.574 9.573)" fill="#002e4b" />
                <Rect id="Rectangle_2909" data-name="Rectangle 2909" width="1.715" height="3.429" transform="translate(25.002 19.86)" fill="#002e4b" />
                <Rect id="Rectangle_2910" data-name="Rectangle 2910" width="1.715" height="3.429" transform="translate(33.574 19.86)" fill="#002e4b" />
                <Rect id="Rectangle_2911" data-name="Rectangle 2911" width="1.715" height="1.715" transform="translate(25.002 30.147)" fill="#002e4b" />
                <Rect id="Rectangle_2912" data-name="Rectangle 2912" width="1.715" height="1.715" transform="translate(33.574 30.147)" fill="#002e4b" />
            </G>
        </Svg>
    )
}
export const RentIcons = ({ color = 'red', height = 40, width = 40 }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 36.865 53.38">
            <G id="_x34_._rental" transform="translate(-12 -3)">
                <Path id="Path_3278" data-name="Path 3278" d="M36.185,43H45.36V58.6H16V43h9.175" transform="translate(-0.248 -3.218)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Path id="Path_3279" data-name="Path 3279" d="M24.01,35H16.67L13,42.34H24.927" transform="translate(0 -2.558)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Path id="Path_3280" data-name="Path 3280" d="M38,42.34H49.927L46.257,35h-7.34" transform="translate(-2.063 -2.558)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Path id="Path_3281" data-name="Path 3281" d="M26,42.01,31.5,31l5.5,11.01" transform="translate(-1.073 -2.228)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Path id="Path_3282" data-name="Path 3282" d="M27.587,37.68H23L31.257,23l8.257,14.68H34.927" transform="translate(-0.825 -1.568)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Ellipse id="Ellipse_247" data-name="Ellipse 247" cx="1.5" cy="2" rx="1.5" ry="2" transform="translate(29 38)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Rect id="Rectangle_2916" data-name="Rectangle 2916" width="5" height="9" transform="translate(28 46)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Rect id="Rectangle_2917" data-name="Rectangle 2917" width="4" height="5" transform="translate(37 46)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Rect id="Rectangle_2918" data-name="Rectangle 2918" width="5" height="5" transform="translate(19 46)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Path id="Path_3283" data-name="Path 3283" d="M18,13.422V7h1.835a1.835,1.835,0,0,1,0,3.67h-.917l2.752,2.752" transform="translate(-0.413 -0.248)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Line id="Line_15" data-name="Line 15" y2="6" transform="translate(25 7)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Line id="Line_16" data-name="Line 16" x1="4" transform="translate(25 13)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Line id="Line_17" data-name="Line 17" x1="4" transform="translate(25 10)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Line id="Line_18" data-name="Line 18" x1="4" transform="translate(25 7)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Path id="Path_3284" data-name="Path 3284" d="M34,13.422V7l3.67,6.422V7" transform="translate(-1.733 -0.248)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Line id="Line_19" data-name="Line 19" x2="3" transform="translate(40 7)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Line id="Line_20" data-name="Line 20" y2="6" transform="translate(41 7)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <Rect id="Rectangle_2919" data-name="Rectangle 2919" width="33" height="12" transform="translate(14 4)" fill="none" stroke="#002e4b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
            </G>
        </Svg>
    )
}
export const TestIcons = ({ color = 'red', height = 40, width = 40 }: IconProps) => {
    return (
        <Svg id="add_circle_outline_black_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <Path id="Path_3295" data-name="Path 3295" d="M0,0H24V24H0Z" fill="red" />
            <Path id="Path_3296" data-name="Path 3296" d="M13,7H11v4H7v2h4v4h2V13h4V11H13ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.011,8.011,0,0,1,12,20Z" fill="#fff" />
        </Svg>


    )
}
