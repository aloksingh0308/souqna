import React from 'react'
import { colors } from './colors'
import { CarIcons,ElectronicsIcons,FurnitureIcons,RestaurantIcons,HomeIcons,MenIcons,WomenIcons,MakeupIcons,CompanyIcons,RentIcons } from './icons'
export const categoryData=[
    {
        id:1,
        name:'Cars',
        icon:<CarIcons/>
    },
    
    {
        id:2,
        name:'Electronics',
        icon:<ElectronicsIcons/>
    },
    {
        id:3,
        name:'Furniture',
        icon:<FurnitureIcons/>
    },
    {
        id:4,
        name:'Restaurant',
        icon:<RestaurantIcons/>
    },
    {
        id:5,
        name:'Men Fashion',
        icon:<MenIcons/>
    },
    {
        id:6,
        name:"Women's Fashion",
        icon:<WomenIcons/>
    },
    {
        id:7,
        name:'Make Up',
        icon:<MakeupIcons/>
    },
    {
        id:8,
        name:'Property for Rent',
        icon:<HomeIcons color={colors.TEXT_COLOR}/>
    },
    {
        id:9,
        name:'Property for Sale',
        icon:<HomeIcons color={colors.TEXT_COLOR} />
    },
    {
        id:10,
        name:'Company',
        icon:<CompanyIcons/>
    },

]