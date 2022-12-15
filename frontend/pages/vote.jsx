import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RectangleBox from '../components/RectangleBox'
import Section from '../components/Section'
import Voters from '../components/Voters'
import Grid from '../components/Grid'
import Footer from '../components/Footer'

import AOS from 'aos';
import 'aos/dist/aos.css';

import { useSelector } from 'react-redux'

import { getUsers } from "../store/auth/authSlice";
import { wrapper } from "../store/store";
import { useRouter } from 'next/router'

const Vote = () => {
    const [hydrated, setHydrated] = useState(false)
    const router = useRouter()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        setHydrated(true)
        AOS.init();
        // if(user){
        //   console.log("user hai")
        //   console.log(user)
        // }else{
        //   console.log("user nahi hai")
        // }
        if(!user){
          router.push('/')
        }
    }, [user])

    if(!hydrated){
        return (<div></div>)
    }

    if(!user){
      return (<div></div>)
    }

    // useEffect(() => {
    //   if(!user){
    //     router.push('/register')
    //   }
    // },[user])

  return (
    <div style={{backgroundColor:"#171717"}}>
        <Navbar/>
        <Section/><br/>
        <RectangleBox/><br/><br/>
        <Voters/><br/><br/>

        <Grid/>
        <br/>
        <Footer/>
        {/* <CircularBar/> */}

    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    // Fetch data from external API
    console.log("calling")
    const SERVER_URL = "https://jmivoting.herokuapp.com"
    const res = await fetch(`${SERVER_URL}/api/votes/fetchUsers`);
    const data = await res.json();
    console.log("server side props");
    console.log(data);

    store.dispatch(getUsers(data));
    // Pass data to the page via props
    // return {
    //   props: { products: data },
    // };
  }
);

export default Vote