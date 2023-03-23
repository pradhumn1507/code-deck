import { createContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
export const PlaygroundContext = createContext();

export const languageMap = {
  cpp: {
    id: 54, // these ids will be used in calling APIs
    defaultCode:
      "#include <iostream>\n" +
      "using namespace std;\n\n" +
      "int main() {\n" +
      '\tcout << "Hello World!";\n' +
      "\treturn 0;\n" +
      "}",
  },
  java: {
    id: 62, // these ids will be used in calling APIs
    defaultCode: `public class Main {
        public static void main(String[] args) {
            System.out.println("Hello World!");
        }
    }`,
  },
  python: {
    id: 71, // these ids will be used in calling APIs
    defaultCode: `print("Hello World")`,
  },
  javascript: {
    id: 63,
    defaultCode: `console.log("Hello World!")`,
  },
};

const PlaygroundProvider = ({ children }) => {
  const initialItems = {
    [uuid()]: {
      title: "DSA",
      playgrounds: {
        [uuid()]: {
          code: languageMap["cpp"].defaultCode,
          title: "Stack Impl",
          language: "cpp",
        },
        [uuid()]: {
          code: languageMap["java"].defaultCode,
          title: "Queue",
          language: "java",
        },
      },
    },
  };
  const [folders, setFolders] = useState(() => {
    let localData = localStorage.getItem("playgrounds-data"); // getting folders from localstorage
    if (localData === null || localData === undefined) {
      return initialItems;
    }
    return JSON.parse(localData); // because data is stored as string in localstorage;
  });
  useEffect(() => {
    localStorage.setItem("playgrounds-data", JSON.stringify(folders)); // saving // updating my folders
  }, [folders]);

  const deleteFolder = (folderId) => {
    setFolders((oldState) => {
      // took old state;
      const newState = { ...oldState }; // Copied oldState into newState; (destructuring)
      delete newState[folderId];
      return newState;
    });
  };

  const deleteCard = (folderId, cardID) => {
    setFolders((oldState) => {
      const newState = { ...oldState };
      delete newState[folderId].playgrounds[cardID];
      return newState;
    });
  };

  const addFolder = (folderName) => {
    setFolders((oldState) => {
      const newState = { ...oldState };
      newState[uuid()] = {
        title: folderName,
        playgrounds: {},
      };
      return newState;
    });
  };

  const addPlayground = (folderId, playgroundName, language) => {
    setFolders((oldState) => {
      const newState = { ...oldState };
      newState[folderId].playgrounds[uuid()] = {
        title: playgroundName,
        language: language,
        code: languageMap[language].defaultCode,
      };
      return newState;
    });
  };

  const addPlaygroundAndFolder = (folderName, playgroundName, cardLanguage) => {
    setFolders((oldState) => {
      const newState = { ...oldState };
      newState[uuid()] = {
        title: folderName,
        playgrounds: {
          [uuid()]: {
            title: playgroundName,
            language: cardLanguage,
            code: languageMap[cardLanguage].defaultCode,
          },
        },
      };
      return newState;
    });
  };

  const editFolderTitle = (folderId, newFolderTitle) => {
    setFolders((oldState) => {
      const newState = { ...oldState };
      newState[folderId].title = newFolderTitle;
      return newState;
    });
  };

  const editCardTitle = (folderId, cardID, newCardTitle) => {
    setFolders((oldState) => {
      const newState = { ...oldState };
      newState[folderId].playgrounds[cardID].title = newCardTitle;
      return newState;
    });
  };

  const savePlayground = (folderId, cardID, newCode, newLanguage) => {
    setFolders((oldState) => {
      const newState = { ...oldState };
      newState[folderId].playgrounds[cardID].code = newCode;
      newState[folderId].playgrounds[cardID].language = newLanguage;
      return newState;
    });
  };
  const PlaygroundFeatures = {
    folders: folders,
    savePlayground: savePlayground,
    editCardTitle: editCardTitle,
    editFolderTitle: editFolderTitle,
    addPlaygroundAndFolder: addPlaygroundAndFolder,
    addPlayground: addPlayground,
    addFolder: addFolder,
    deleteFolder: deleteFolder,
    deleteCard: deleteCard,
  };
  return (
    <PlaygroundContext.Provider value={PlaygroundFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};

export default PlaygroundProvider;