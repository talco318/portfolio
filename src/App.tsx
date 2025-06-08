import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage'; // Assuming MainPage.tsx exists
import { LinkedinRedirect } from './components/LinkedinRedirect'; 


function App() {
    return (
        <BrowserRouter basename="">
            <div>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/linkedin" element={<LinkedinRedirect />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
