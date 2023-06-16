'use client'
import Layout from 'antd/es/layout/layout'
import Layoutdashboard from '../../components/layout/dashboard'

import { Inter } from 'next/font/google'
import Wrapper from '@/app/components/layout/Wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <div className=''>
    <Wrapper>
    {children}
    </Wrapper>
    </div>
    
      </body>
    </html>
  )
}
