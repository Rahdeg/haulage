'use client'
import Image from 'next/image'
import LoginInput from './components/inputs/LoginInput'
import { useState } from 'react'

export default function Home() {
  const localStorageAuth = typeof window !== 'undefined' && window.localStorage.getItem('auth');
  const [auth, setAuth] = useState(false || localStorageAuth === 'true');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
     <div className='flex flex-col gap-5 items-center justify-center'>
    { /*<Image src="http://esthelhaulage.com//view/signup/img/icon_img.png" width={120} height={120} alt='logo'/>*/}
    <p>COMPANY LOGO</p>
     <h1 className=' text-blue-950 font-extrabold text-base'>Company Haulage Services</h1>
     </div>
    
     <LoginInput/>
    
     
    </main>
  )
}
