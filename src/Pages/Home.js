import React, { useContext } from "react";
import LeftPaneHomeScreen from "../Components/Home/LeftPaneHomeScreen";
import RightPaneHomeScreen from "../Components/Home/RightPaneHomeScreen";
import Modal from "../Components/Modal";
import { ModalContext } from "../Context/ModalContext";
function Home() {
  const { isOpenModal } = useContext(ModalContext);
  return (
    <div className="grid grid-cols-2">
      <div>
        <LeftPaneHomeScreen />
      </div>
      <div>
        <RightPaneHomeScreen />
      </div>
      {isOpenModal.show && <Modal />}
    </div>
  );
}

export default Home;