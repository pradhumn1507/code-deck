import React, { useContext } from 'react'
import { ModalContext } from '../../Context/ModalContext'

export default function LeftPaneHomeScreen() {
  const {openModal}=useContext(ModalContext);

  return (
    <div className='bg-black border-2 border-black h-screen flex justify-end  '>
      <div className='mx-auto flex flex-col items-center justify-center gap-3'>
        <img src='./logo.svg.png' alt='logo'></img>
        <h3 className='font-semibold text-white'>Code Deck</h3>
        <h3 className='font-semibold text-white'>Code. Compile. Debug</h3>
        <button className='w-full p-4 bg-white rounded-lg drop-shadow-2xl' 
        onClick={()=>openModal(
          {
            show:true,
            modalType:3,
            identifiers:{
              folderId:"",
              cardID:"",
            }
          }
        )}>+ Create New playground</button>
      </div>
    </div>
  )
}
