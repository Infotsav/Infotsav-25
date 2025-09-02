import React from 'react'

interface ContactProps {
  name: string;
  email: string;
  phone: string;
}

const Contact = ({ name, email, phone }: ContactProps) => {
  return (
    <div className='px-15 max-sm:px-4 text-center'>
      <h2 className='text-xl font-bold'>{name}</h2>
      <p className='text-sm'>{email}</p>
      <p className='text-sm'>{phone}</p>
    </div>
  )
}

export default Contact