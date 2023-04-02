import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PlaygroundContext, languageMap } from "../Context/PlaygroundContext";
import { ModalContext } from "../Context/ModalContext";
import { Buffer } from "buffer";
import axios from "axios";
import Navbar from "../Components/Playground/Navbar";
import EditContainer from "../Components/Playground/EditContainer";
import InputConsole from "../Components/Playground/InputConsole";
import OutputConsole from "../Components/Playground/OutputConsole";
import Modal from "../Components/Modal";

function PlayGround() {
  const { folderID, playgroundID } = useParams();
  const { folders, savePlayground } = useContext(PlaygroundContext);
  const { isOpenModal, openModal, closeModal } = useContext(ModalContext);
  const { title, language, code } = folders[folderID].playgrounds[playgroundID];
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [currentCode, setCurrentCode] = useState(code);
  const [currentInput, setCurrentInput] = useState("");
  const [currentOutput, setCurrentOutput] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

 

  const savecode = () => {
    savePlayground(folderID, playgroundID, currentCode, currentLanguage);
  };

  // this function will encode my code from binary(human readable) to base64(api readable)
  const encode = (str) => {
    return Buffer.from(str, "binary").toString("base64");
  };
  const decode = (str) => {
    return Buffer.from(str, "base64").toString();
  };
  // (code , language , input) -> token
  const postSubmission = async (language_id, source_code, std_in) => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: true, fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        std_in: std_in,
      }),
    };
    const res = await axios.request(options);
    return res.data.token;
  };

  // token -> output
  const getOutput = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: true, fields: "*" },
      headers: {
        "X-RapidAPI-Key": "b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };
    const res = await axios.request(options); /// res.data -> 789
    // my api has been failed
    if (res.data.status_id <= 2) {
      const res2 = await getOutput(token);
      return res2.data;
    }
    return res.data; /// -> 789
  };

  const runCode = async () => {
    openModal({
      show: true,
      modalType: 6,
      identifiers: {
        folderId: "",
        cardID: "",
      },
    });
    const language_id = languageMap[currentLanguage].id;
    const source_code = encode(currentCode);
    const std_in = encode(currentInput);
    const token = await postSubmission(language_id, source_code, std_in);
    const res = await getOutput(token);

    const status_name = res.status.description;
    const decoded_output = decode(res.stdout ? res.stdout : "");
    const decoded_compile_output = decode(
      res.compile_output ? res.compile_output : ""
    );
    const decoded_error = decode(res.stderr ? res.stderr : "");
    let final_output = "";
    if (res.status_id !== 3) {
      if (decoded_compile_output === "") {
        final_output = decoded_error;
      } else {
        final_output = decoded_compile_output;
      }
    } else {
      final_output = decoded_output;
    }
    setCurrentOutput(status_name + "\n\n" + final_output);
    closeModal();
  };

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (err) => reject(err);
      reader.readAsText(file);
    });
  }

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then((content) => {
        setState(content);
      })
      .catch((err) => console.log(err));
  };
  
  const getFile = (e, setState) => {
    const input = e.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0], setState);
    }
  };

  return (
    <div>
      <Navbar isFullScreen={isFullScreen} />
      <div className="flex flex-row h-full">
        <div className={`${isFullScreen ? "w-full" : "w-3/4"}`}>
          <EditContainer
            title={title}
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
            currentCode={currentCode}
            setCurrentCode={setCurrentCode}
            folderID={folderID}
            playgroundID={playgroundID}
            savecode={savecode}
            runCode={runCode}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            getFile={getFile}
          />
        </div>
        {!isFullScreen && (
          <div className="w-1/4">
            <InputConsole
              currentInput={currentInput}
              setCurrentInput={setCurrentInput}
              getFile={getFile}
            />
            <OutputConsole currentOutput={currentOutput} />
          </div>
        )}
        {isOpenModal.show && <Modal />}
      </div>
    </div>
  );
}

export default PlayGround;