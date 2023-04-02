import React, { useContext, useState } from "react";
// npm i react-select
import { RxCross1 } from "react-icons/rx";
import { ModalContext } from "../../Context/ModalContext";
import { PlaygroundContext } from "../../Context/PlaygroundContext";
import Select from "react-select";
function NewPlayGround() {
  const { isOpenModal, closeModal } = useContext(ModalContext);
  const { addPlayground } = useContext(PlaygroundContext);
  const languageOptions = [
    // value -> hex, label -> string
    { value: "javascript", label: "javascript" }, // label will be visible to user // value will be passed to db;
    { value: "python", label: "python" },
    { value: "java", label: "java" },
    { value: "cpp", label: "cpp" },
  ];
  const { folderId } = isOpenModal.identifiers;
  const [cardTitle, setCardTitle] = useState("");
  // language is an objl
  const [language, setLanguage] = useState(languageOptions[0]); // this state will be holding language of playground
  // initially it's storing js;
  const handleLangChange = (selectedOption) => {
    setLanguage(selectedOption);
  };
  return (
    <>
      <div className="flex flex-row justify-end p-4">
        <RxCross1 className="cursor-pointer" onClick={() => closeModal()} />
      </div>
      <div className="px-6 my-4 mb-8 flex flex-col items-center justify-center gap-6">
        <h2>Create A New Playground</h2>
        <input
          type="text"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          className="border-[.5px] text-sm border-gray-50 rounded-lg shadow-sm p-2 w-full"
        />
        <Select
          options={languageOptions} // array of objects;
          value={language} // this is an object;
          onChange={handleLangChange}
        />
        <button
          onClick={() => {
            addPlayground(folderId, cardTitle, language.value);
            closeModal();
          }}
          className="p-3 w-36 text-black bg-white rounded-lg font-semibold border-[.5px] border-gray-50 shadow-lg"
        >
          Create Playground
        </button>
      </div>
    </>
  );
}

export default NewPlayGround;