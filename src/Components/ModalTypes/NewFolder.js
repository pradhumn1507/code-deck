import React, { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { ModalContext } from "../../Context/ModalContext";
import { PlaygroundContext } from "../../Context/PlaygroundContext";

function NewFolder() {
  const { closeModal } = useContext(ModalContext);
  const { addFolder } = useContext(PlaygroundContext);
  const [folderTitle, setFolderTitle] = useState("");
  return (
    <>
      <div className="flex flex-row justify-end p-4">
        <RxCross1 className="cursor-pointer" onClick={() => closeModal()} />
      </div>
      <div className="px-6 py-4 mb-8 flex flex-col items-center justify-center gap-6">
        <h2>Create a New Folder</h2>
        <input
          type="text"
          onChange={(e) => setFolderTitle(e.target.value)}
          value={folderTitle}
          placeholder="please enter folder title"
          className="border-[.5px] text-sm border-gray-50 rounded-lg shadow-sm p-2 w-full"
        />
        <button
          onClick={() => {
            addFolder(folderTitle);
            closeModal();
          }}
          className="p-3 w-36 text-black bg-white rounded-lg font-semibold border-[.5px] border-gray-50 shadow-lg"
        >
          Create Folder
        </button>
      </div>
    </>
  );
}

export default NewFolder;