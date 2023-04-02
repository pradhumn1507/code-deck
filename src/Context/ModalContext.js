import React,{createContext,useState} from 'react'
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
const [isOpenModal,setIsOpenModal]=useState({...initialModalFields});
const openModal=(value)=>{
  setIsOpenModal(value);
}
const closeModal=()=>{
  setIsOpenModal({...initialModalFields});
}
const ModalFeatures = {
  isOpenModal: isOpenModal, // state
  openModal: openModal, // fn
  closeModal: closeModal, // fn
};
  return (
    <ModalContext.Provider value={ModalFeatures}>
      {children}
    </ModalContext.Provider>
  )
}
