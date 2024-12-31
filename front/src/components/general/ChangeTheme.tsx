'use client'
import React, { useEffect, useState } from 'react'
import { DarkMode , LightMood } from '@/assets/icons';
import {getCookies , setCookies} from "@/utils/cookiesManipulate"



function ChangeTheme() {


    const [ currentTheme , setCurrentTheme ]=useState<string>("")

    const ChangeThemeFun = ( ) => {
        getCookies('theme').then((current)=>{
            const changedThem =  current == 'dark' ? 'ligth' :'dark' 
            setCookies({name:"theme" , value:changedThem})
            setCurrentTheme(changedThem)
        }).catch((err:any)=>{
            setCookies({name:"theme" , value:'light'})
        })
    }

    useEffect(()=>{
        getCookies('theme').then((current)=>{

            if(!current) setCookies({name:"theme" , value:'ligth'})
            const changedThem =  current == 'dark' ? 'dark' :'ligth' 
            setCurrentTheme(changedThem)
        }).catch((err:any)=>{
            setCookies({name:"theme" , value:'light'})
        })

            },[])
  return (
    <button onClick={ChangeThemeFun}>{
        currentTheme == 'dark' ? (<LightMood />) :  currentTheme == 'ligth' && (<DarkMode />)
    }</button>
  )
}

export default ChangeTheme