import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlaygroundProvider from "./Context/PlaygroundContext";
import ModalProvider from "./Context/ModalContext";
import routes from "./Pages/Routes"; // array of objects
// import Home from "./Pages/Home";
const Loader = () => {
  <div>Loading...</div>;
};
function App() {
  return (
    // Suspence from react
    <Suspense fallback={Loader()}> 
    <PlaygroundProvider>
      <ModalProvider>
     <BrowserRouter>
        <Routes>
          <>
            {routes.map((route) => (
              <Route path={route.path} element={route.component} />
            ))}
          </>
        </Routes>

      </BrowserRouter>
      </ModalProvider>
      </PlaygroundProvider>
    </Suspense>
    // <div><Home/> </div>
  );
}

export default App;