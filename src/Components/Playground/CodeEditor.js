import React, { useEffect, useState } from "react";
// npm i @uiw/react-codemirror
import CodeMirror from "@uiw/react-codemirror";
// npm i @uiw/codemirror-theme-bespin @uiw/codemirror-theme-duotone @uiw/codemirror-theme-github
// @uiw/codemirror-theme-dracula @uiw/codemirror-theme-github
// @uiw/codemirror-theme-xcode @uiw/codemirror-theme-vscode
// @uiw/codemirror-theme-okaidia
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { bespin } from "@uiw/codemirror-theme-bespin";
import { duotoneDark, duotoneLight } from "@uiw/codemirror-theme-duotone";

// npm i @codemirror/lang-cpp
// npm i @codemirror/lang-java
// npm i @codemirror/lang-javascript
// npm i @codemirror/lang-python
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";

// configs
import { indentUnit } from "@codemirror/language";
import { EditorState } from "@codemirror/state";

function CodeEditor({
  currentCode,
  setCurrentCode,
  isFullScreen,
  currentLanguage,
  currentTheme,
}) {
  const [theme, setTheme] = useState(githubDark);
  const [language, setLanguage] = useState(javascript);
  useEffect(() => {
    if (currentLanguage === "javascript") {
      setLanguage(javascript);
    } else if (currentLanguage === "python") {
      setLanguage(python);
    } else if (currentLanguage === "java") {
      setLanguage(java);
    } else if (currentLanguage === "cpp") {
      setLanguage(cpp);
    }
  }, [currentLanguage]);

  useEffect(() => {
    if (currentTheme === "githubDark") {
      setTheme(githubDark);
    } else if (currentTheme === "githubLight") {
      setTheme(githubLight);
    } else if (currentTheme === "bespin") {
      setTheme(bespin);
    } else if (currentTheme === "duotoneDark") {
      setTheme(duotoneDark);
    } else if (currentTheme === "duotoneLight") {
      setTheme(duotoneLight);
    }
  }, [currentTheme]);
  return (
    <CodeMirror
      value={currentCode}
      height={`${isFullScreen ? "92vh" : "76vh"}`}
      theme={theme}
      extensions={[
        language,
        indentUnit.of("     "),
        EditorState.tabSize.of(8),
        EditorState.changeFilter.of(() => true),
      ]}
      onChange={(value) => setCurrentCode(value)}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightSpecialChars: true,
        history: true,
        foldGutter: true,
        drawSelection: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        crosshairCursor: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        closeBracketsKeymap: true,
        defaultKeymap: true,
        searchKeymap: true,
        historyKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        lintKeymap: true,
      }}
    />
  );
}

export default CodeEditor;