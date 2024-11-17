import { Link } from "react-router-dom";
import  Logo from '../../assets/Logo.svg';
import StarSeparator from '../StarSeparator/StarSeparator'
export default function Home() {
  return (
    <>
      <div className='flex flex-col justify-center items-center bg-mainColor gap-5 py-36 duration-300 md:py-56 text-center'>
      <div className="w-56 flex justify-center my-3">
      <img src={Logo} alt="Logo img" className='w-full mb-4'/>
      </div>
      <h1 className="text-white text-4xl font-bold uppercase mb-3">Start Framework</h1>
      <StarSeparator/>
      <p className='text-white'>Graphic Artist - Web Designer - Illustrator</p>
    </div>
    </>
  );
}
