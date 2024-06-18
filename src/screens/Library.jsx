// import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VideoList from '../components/VideoList';
export default function Library() {
  return (
    <div>
                          <Navbar/>
                          <div style={{ marginTop: '50px' }}>
                          <VideoList/>
                          </div>
                          <Footer/>
      
    </div>
  )
}
