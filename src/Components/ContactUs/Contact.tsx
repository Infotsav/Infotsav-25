import React from 'react'

interface ContactProps {
  name: string;
  email: string;
  phone: string;
}

const Contact = ({ name, email, phone }: ContactProps) => {
  return (
    <div className='px-2 sm:px-4 text-center py-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg'>
      <h2 className='text-lg sm:text-xl font-bold text-white mb-2'>{name}</h2>
      <p className='text-xs sm:text-sm text-gray-300 mb-1 break-words'>{email}</p>
      <p className='text-xs sm:text-sm text-gray-300'>{phone}</p>
    </div>
  )
}

export default Contact