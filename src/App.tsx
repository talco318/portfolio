import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from "./components/MainPage.tsx";
import {ContactSectionNew} from "./components/ContactSectionNew.tsx";

function App() {
  return (
      <BrowserRouter basename={""}>
          <div>
              <Routes>
                  <Route path="/" element={<MainPage/>}></Route>
                  <Route path="/copy" element={<ContactSectionNew/>}></Route>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;