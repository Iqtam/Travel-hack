import React from 'react'
import { useParams,useNavigate } from 'react-router-dom';
function HotelDetail() {
    const { id } = useParams();
    console.log('in 1 hotel detail');
    console.log(id);
  return (
    <div>HotelDetail {id}</div>
  )
}

export default HotelDetail