import error from '../../assets/error.png'

export default function NotFound() {

  return (
    <div className='text-6xl font-mono font-bold min-h-screen text-center flex justify-center items-center text-white'><img src={error} alt="error 404 photo"/></div>
  )
}