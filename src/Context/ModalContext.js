(import React,{createContext,useState} from 'react'
export const ModalContext=createContext();

export default function ModalProvider({children}) {
const initialModalFields={
show:false,
modalType: "",
identifiers: {
  folderId: "",
  cardID: "",
}
}
const [isopenModal,setIsOpenModal]=useState({...initialModalFields});
const openModal=(value)=>{
  setIsOpenModal(value);
}
const closeModal=()=>{
  setIsOpenModal(...initialModalFields);
}
  return (
    <ModalContext.Provider value={{openModal,closeModal,isopenModal}}>
      {children}
    </ModalContext.Provider>
  )
}
