import { useState } from 'react'
import port1 from '../../assets/port1.png'
import port2 from '../../assets/port2.png'
import port3 from '../../assets/port3.png'
import StarSeparator from '../StarSeparator/StarSeparator'

export default function Portfolio() {
  const [selectedImg, setSelectedImg] = useState(null)
  const images = [port1, port2, port3, port1, port2, port3];

  function handleImage(img){
    setSelectedImg(img)
  }
  
  return (
    <div className="container py-32 mx-auto text-secColor flex flex-col ">
      <h5 className="font-bold text-4xl text-center uppercase my-4">portfolio component</h5>
      <StarSeparator borderColor="border-secColor" starColor="text-secColor" />
      <div className="grid md:grid-cols-3 gap-11 px-10 md:px-28 pt-10">
        { images.map((port, index) => (
          <div key={index} className="relative group">
            <img src={port} alt={`Portfolio image ${index + 1}`} className='rounded-lg w-full'/>
            <div className="absolute inset-0 bg-mainColor opacity-0 group-hover:opacity-90 transition-all duration-500 rounded-lg flex flex-col justify-center items-center cursor-pointer text-9xl font-bold" onClick={() => handleImage(port)}>
              <i className="fa-solid fa-plus text-white" />
            </div>
          </div>
        )) }
      </div>
      {/* Model */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="relative p-4 w-full max-w-2xl max-h-full rounded-lg shadow"
            onClick={(e) => e.stopPropagation()} 
          >
            <img src={selectedImg} alt="" />
          </div>
        </div>
      )}
    </div>
  )
}