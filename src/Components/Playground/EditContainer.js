import React, { useContext, useState } from "react";
import { ModalContext } from "../../Context/ModalContext";
import { BiEditAlt, BiImport, BiExport, BiFullscreen } from "react-icons/bi";
import Select from "react-select";
import { languageMap } from "../../Context/PlaygroundContext";
import CodeEditor from "./CodeEditor";
function EditContainer({
  title,
  currentLanguage, // this is string
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  folderID,
  playgroundID,
  savecode,
  runCode,
  isFullScreen,
  setIsFullScreen,
  getFile,
}) {
  const { openModal } = useContext(ModalContext);
  const themeOptions = [
    { value: "githubDark", label: "Github Dark" },
    { value: "githubLight", label: "github light" },
    { value: "bespin", label: "Bespin" },
    { value: "duotoneDark", label: "Duotone Dark" },
    { value: "duotoneLight", label: "Duotone Light" },
  ];
  const languageOptions = [
    { value: "cpp", label: "C++" },
    { value: "javascript", label: "Javascript" },
    { value: "python", label: "python" },
    { value: "java", label: "java" },
  ];
  const [currentTheme, setCurrentTheme] = useState(themeOptions[0]);
  const handleThemeChange = (selectedOption) => {
    setCurrentTheme(selectedOption);
  };
  // language is object for my dropdown
  // currentLanguage is string coming from parent component
  const [language, setLanguage] = useState(() => {
    for (let i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i].value === currentLanguage) {
        return languageOptions[i];
      }
    }
    return languageOptions[0];
  });
  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
    setCurrentLanguage(selectedOption.value);
    setCurrentCode(languageMap[selectedOption.value].defaultCode);
  };
  return (
    <div
      className={`flex flex-col ${
        isFullScreen ? "h-[100vh]" : "h-[calc(100vh_-_4.5rem)]"
      }`}
    >
      {/* navbar for editcontainer */}
      {!isFullScreen && (
        <div className="bg-white flex justify-between items-center flex-wrap p-4">
          <div className="flex gap-4 items-center">
            <h3 className="font-semibold">{title}</h3>
            <BiEditAlt
              style={{ fontSize: "1.5rem" }}
              onClick={() =>
                openModal({
                  show: true,
                  modalType: 5,
                  identifiers: {
                    folderId: folderID,
                    cardID: playgroundID,
                  },
                })
              }
            />
            <button className="font-normal rounded-full p-2 bg-[#0097d7]">
              Save Code
            </button>
          </div>
          <div className="flex gap-4">
            <Select
              options={languageOptions}
              value={language} // this is an object
              // language is object for my dropdown
              // currentLanguage is string coming from parent component
              onChange={handleLanguageChange}
            />
            <Select
              options={themeOptions}
              value={currentTheme}
              onChange={handleThemeChange}
            />
          </div>
        </div>
      )}
      {/* CodeEditor */}
      <CodeEditor
        currentCode={currentCode}
        setCurrentCode={setCurrentCode}
        isFullScreen={isFullScreen}
        currentLanguage={currentLanguage}
        currentTheme={currentTheme.value}
      />
      {/* Footer */}
      <div className="bg-white flex w-full justify-between p-4">
        <button
          className="flex gap-3 items-center"
          onClick={() => setIsFullScreen((isFullScreen) => !isFullScreen)}
        >
          <BiFullscreen style={{ fontSize: "1.5rem" }} />
          {isFullScreen ? "Minimize Screen" : "Full Screen"}
        </button>
        <label className="flex gap-3 items-center" htmlFor="codefile">
          <input
            className="hidden"
            type="file"
            accept="."
            id="codefile"
            onChange={(e) => getFile((e, setCurrentCode))}
          />
          <BiImport style={{ fontSize: "1.5rem" }} /> Import Code
        </label>
        <a
          className="flex gap-3 items-center"
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(
            currentCode
          )}`}
          download="code.txt"
        >
          <BiExport style={{ fontSize: "1.5rem" }} />
          Export Code
        </a>
        <button
          onClick={runCode}
          className="font-normal rounded-full p-2 bg-[#0098d7]"
        >
          run code
        </button>
      </div>
    </div>
  );
}

export default EditContainer;