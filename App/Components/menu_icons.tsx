import React from 'react'
import Svg, { Path, G, Rect, Line, Ellipse } from 'react-native-svg'
import { colors } from './colors'

interface IconProps {
    colorbg?: string,
    height?: number,
    width?: number,
    activeColor?: string,
    color?: string,
    bgcolor?: string
}

export const TestIcons = (props, { colorbg = colors.TEXT_COLOR, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="18.457" height="21.094" viewBox="0 0 18.457 21.094">
            <Path id="Icon_awesome-lock" data-name="Icon awesome-lock" d="M16.479,9.229h-.989V6.262a6.262,6.262,0,0,0-12.524,0V9.229H1.978A1.978,1.978,0,0,0,0,11.206v7.91a1.978,1.978,0,0,0,1.978,1.978h14.5a1.978,1.978,0,0,0,1.978-1.978v-7.91A1.978,1.978,0,0,0,16.479,9.229Zm-4.285,0H6.262V6.262a2.966,2.966,0,1,1,5.933,0Z" fill="#ab9d6c" />
        </Svg>

    )
}
export const LockIcons = (props, { colorbg = colors.TEXT_COLOR, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="18.457" height="21.094" viewBox="0 0 18.457 21.094">
            <Path id="Icon_awesome-lock" data-name="Icon awesome-lock" d="M16.479,9.229h-.989V6.262a6.262,6.262,0,0,0-12.524,0V9.229H1.978A1.978,1.978,0,0,0,0,11.206v7.91a1.978,1.978,0,0,0,1.978,1.978h14.5a1.978,1.978,0,0,0,1.978-1.978v-7.91A1.978,1.978,0,0,0,16.479,9.229Zm-4.285,0H6.262V6.262a2.966,2.966,0,1,1,5.933,0Z" fill={activeColor} />
        </Svg>

    )
}
export const LocationIcons = (props, { colorbg = colors.TEXT_COLOR, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="18.2" height="26" viewBox="0 0 18.2 26">
            <Path id="Icon_material-location-on" data-name="Icon material-location-on" d="M16.6,3a9.093,9.093,0,0,0-9.1,9.1c0,6.825,9.1,16.9,9.1,16.9s9.1-10.075,9.1-16.9A9.093,9.093,0,0,0,16.6,3Zm0,12.35a3.25,3.25,0,1,1,3.25-3.25A3.251,3.251,0,0,1,16.6,15.35Z" transform="translate(-7.5 -3)" fill="#ab9d6c" />
        </Svg>

    )
}
export const LikeIcons = (props, { colorbg = colors.TEXT_COLOR, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="22" height="18.822" viewBox="0 0 22 18.822">
            <G id="Icon_ionic-md-thumbs-up" data-name="Icon ionic-md-thumbs-up" transform="translate(-3.375 -4.5)">
                <Path id="Path_152" data-name="Path 152" d="M26.214,23.322h-9.68a2.079,2.079,0,0,1-1.925-1.147L11.4,15.538a1.665,1.665,0,0,1-.146-.686V12.96a2.28,2.28,0,0,1,2.127-2.186h6.708L19.073,6.779l-.034-.294a1.334,1.334,0,0,1,.467-1l1.137-.99,7.091,6.24a1.77,1.77,0,0,1,.619,1.328v9.411A2,2,0,0,1,26.214,23.322Z" transform="translate(-7.875 0)" fill="#ab9d6c" />
                <Path id="Path_153" data-name="Path 153" d="M6.173,15.75h-2.8v9.794h2.8Z" transform="translate(19.202 -2.222)" fill="#ab9d6c" />
            </G>
        </Svg>

    )
}
export const SearchIcons = (props, { colorbg = props.bgcolor, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="18.612" height="18.612" viewBox="0 0 18.612 18.612">
            <G id="Icon_feather-search" data-name="Icon feather-search" transform="translate(-3 -3)">
                <Path id="Path_149" data-name="Path 149" d="M17.825,11.162A6.662,6.662,0,1,1,11.162,4.5,6.662,6.662,0,0,1,17.825,11.162Z" fill="none" stroke="#0e3147" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                <Path id="Path_150" data-name="Path 150" d="M28.6,28.6l-3.623-3.623" transform="translate(-9.107 -9.107)" fill="none" stroke="#0e3147" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
            </G>
        </Svg>
    )
}
export const SellIcons = (props, { colorbg = colors.TEXT_COLOR, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg id="add_circle_outline_black_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <Path id="Path_3295" data-name="Path 3295" d="M0,0H24V24H0Z" fill={colorbg} />
            <Path id="Path_3296" data-name="Path 3296" d="M13,7H11v4H7v2h4v4h2V13h4V11H13ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.011,8.011,0,0,1,12,20Z" fill={activeColor} />
        </Svg>
    )
}
export const ChatIcons = (props, { colorbg = colors.TEXT_COLOR, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg id="chat_bubble_outline_black_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <Path id="Path_3293" data-name="Path 3293" d="M0,0H24V24H0Z" fill={colorbg} />
            <Path id="Path_3294" data-name="Path 3294" d="M20,2H4A2.006,2.006,0,0,0,2,4V22l4-4H20a2.006,2.006,0,0,0,2-2V4A2.006,2.006,0,0,0,20,2Zm0,14H6L4,18V4H20Z" fill={activeColor} />
        </Svg>

    )
}
export const FavIcons = (props, { colorbg = colors.TEXT_COLOR, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg id="favorite_border_black_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <Path id="Path_3299" data-name="Path 3299" d="M0,0H24V24H0Z" fill={colorbg} />
            <Path id="Path_3300" data-name="Path 3300" d="M16.5,3A5.988,5.988,0,0,0,12,5.09,5.988,5.988,0,0,0,7.5,3,5.447,5.447,0,0,0,2,8.5c0,3.78,3.4,6.86,8.55,11.54L12,21.35l1.45-1.32C18.6,15.36,22,12.28,22,8.5A5.447,5.447,0,0,0,16.5,3ZM12.1,18.55l-.1.1-.1-.1C7.14,14.24,4,11.39,4,8.5A3.418,3.418,0,0,1,7.5,5a3.909,3.909,0,0,1,3.57,2.36h1.87A3.885,3.885,0,0,1,16.5,5,3.418,3.418,0,0,1,20,8.5C20,11.39,16.86,14.24,12.1,18.55Z" fill={activeColor} />
        </Svg>
    )
}
export const HomeIcons = (props, { colorbg = colors.TEXT_COLOR, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg id="home_black_24dp_3_" data-name="home_black_24dp (3)" xmlns="http://www.w3.org/2000/svg" width="27.991" height="27.991" viewBox="0 0 27.991 27.991">
            <Path id="Path_3291" data-name="Path 3291" d="M0,0H27.991V27.991H0Z" fill={colorbg} />
            <Path id="Path_3292" data-name="Path 3292" d="M13.663,6.137l5.832,5.248v9.109H17.162v-7h-7v7H7.832V11.386l5.832-5.248m0-3.137L2,13.5H5.5v9.33h7v-7h2.333v7h7V13.5h3.5Z" transform="translate(0.333 0.499)" fill={activeColor} />
        </Svg>

    )
}
export const CommentIcons = (props, { colorbg = props.bgcolor, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg id="mode_comment_black_24dp" xmlns="http://www.w3.org/2000/svg" width="24.494" height="24" viewBox="0 0 24.494 24">
            <Path id="Path_3307" data-name="Path 3307" d="M24.494,0H0V24H24.494Z" fill={colorbg} />
            <Path id="Path_3308" data-name="Path 3308" d="M2.01,4A2.018,2.018,0,0,1,4.041,2H20.371a2.027,2.027,0,0,1,2.041,2V16a2.027,2.027,0,0,1-2.041,2H6.082L2,22Z" transform="translate(0.041)" fill={activeColor} />
        </Svg>

    )
}
export const NotificationIcons = (props, { colorbg = colors.TEXT_COLOR, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg id="notifications_black_24dp_2_" data-name="notifications_black_24dp (2)" xmlns="http://www.w3.org/2000/svg" width="26.896" height="26.896" viewBox="0 0 26.896 26.896">
            <Path id="Path_3301" data-name="Path 3301" d="M0,0H26.9V26.9H0Z" fill={colorbg} />
            <Path id="Path_3302" data-name="Path 3302" d="M12.965,24.353a2.248,2.248,0,0,0,2.241-2.241H10.724A2.248,2.248,0,0,0,12.965,24.353Zm6.724-6.724v-5.6c0-3.441-1.827-6.321-5.043-7.083V4.181a1.681,1.681,0,0,0-3.362,0v.762c-3.205.762-5.043,3.631-5.043,7.083v5.6L4,19.871v1.121H21.931V19.871ZM17.448,18.75H8.483V12.026c0-2.779,1.692-5.043,4.483-5.043s4.483,2.264,4.483,5.043Z" transform="translate(0.483 0.302)" fill={activeColor} />
        </Svg>

    )
}
export const ShareIcons = (props, { colorbg = props.bgcolor, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg id="share_black_24dp_1_" data-name="share_black_24dp (1)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <Path id="Path_3303" data-name="Path 3303" d="M0,0H24V24H0Z" fill={colorbg} />
            <Path id="Path_3304" data-name="Path 3304" d="M18,16.08a2.912,2.912,0,0,0-1.96.77L8.91,12.7A3.274,3.274,0,0,0,9,12a3.274,3.274,0,0,0-.09-.7l7.05-4.11A2.993,2.993,0,1,0,15,5a3.274,3.274,0,0,0,.09.7L8.04,9.81a3,3,0,1,0,0,4.38l7.12,4.16a2.821,2.821,0,0,0-.08.65A2.92,2.92,0,1,0,18,16.08ZM18,4a1,1,0,1,1-1,1A1,1,0,0,1,18,4ZM6,13a1,1,0,1,1,1-1A1,1,0,0,1,6,13Zm12,7.02a1,1,0,1,1,1-1A1,1,0,0,1,18,20.02Z" fill={activeColor} />
        </Svg>


    )
}
export const UserIcons = (props, { colorbg = props.colorbg, height = 40, width = 40, activeColor = props.color }: IconProps) => {
    return (
        <Svg id="person_black_24dp_2_" data-name="person_black_24dp (2)" xmlns="http://www.w3.org/2000/svg" width="26.213" height="26.213" viewBox="0 0 26.213 26.213">
            <Path id="Path_3297" data-name="Path 3297" d="M0,0H26.213V26.213H0Z" fill={colorbg} />
            <Path id="Path_3298" data-name="Path 3298" d="M12.738,6.184a2.184,2.184,0,1,1-2.184,2.184,2.191,2.191,0,0,1,2.184-2.184m0,10.922c2.949,0,6.335,1.409,6.553,2.184H6.184c.251-.786,3.615-2.184,6.553-2.184M12.738,4a4.369,4.369,0,1,0,4.369,4.369A4.368,4.368,0,0,0,12.738,4Zm0,10.922C9.821,14.922,4,16.386,4,19.291v2.184H21.475V19.291C21.475,16.386,15.654,14.922,12.738,14.922Z" transform="translate(0.369 0.369)" fill={activeColor} />
        </Svg>


    )
}
