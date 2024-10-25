import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css';
import Home from './component/Home';
import Navbar3 from './component/Navbar3';
import Destination from './component/Destination';
import DestinationDetail from './component/DestinationDetail';
import Hotel from './component/Hotel';
import Hotel2 from './component/Hotel2';
import HotelDetail from './component/HotelDetail';
import Album from './component/Album';
import AlbumView from './component/AlbumView';
import FinalizePlan from './component/FinalizePlan';
import Resturaunt from './component/Resturaunt'

import { useDestStore } from './Store';

import api from './api';



function App() {
  const destStore = useDestStore((state) => state.setDest);

  
const getDetailHandler = async (tourData) => {
  const apiData = await api.post("city", tourData);

  console.log(apiData.data);
  console.log('in app.js');

  
  destStore(apiData.data);

  return apiData.data;
};

  return (
    <BrowserRouter>
      <Navbar3/>
      <Routes>
        <Route path='/' element={<Home getDetail={getDetailHandler}/>}/>
        <Route path='/destination' element={<Destination />}/>
        <Route path="destination/:id" element={<DestinationDetail />} />
        <Route path="hotel/:id" element={<Hotel />} /> {/* this is hotel/destinationid helper */}
        <Route path="hotel2/:id" element={<Hotel2 />} /> {/* this is hotel/destinationid display hotel list */}
        {/* <Route path="hotelDetail/:id" element={<HotelDetail />} />  */}
        
        {/* this is hotel/hotelID display hotel , not needed*/} 
        <Route path='/restu' element={<Resturaunt />} />

        <Route path='/finalize' element={<FinalizePlan />} />

        <Route path='/albums' element={<Album />}/>
        <Route path='/albums/:id' element={<AlbumView />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
