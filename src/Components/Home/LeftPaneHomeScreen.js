import React from 'react'

export default function LeftPaneHomeScreen() {
  return (
    <div className='bg-black border-2 border-black h-screen flex justify-end  '>
      <div className='mx-auto flex flex-col items-center justify-center gap-3'>
        <img src='./logo.svg.png' alt='logo'></img>
        <h3 className='font-semibold text-white'>Code Deck</h3>
        <h3 className='font-semibold text-white'>Code. Compile. Debug</h3>
      </div>
    </div>
  )
}
