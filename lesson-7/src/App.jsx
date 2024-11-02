import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Heroes from './pages/Heroes';
import About from './pages/About';
import ModalCharacter from './components/ModalCharacter';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';


function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="heroes" element={ <Heroes /> }>
              <Route path=":id" element={<ModalCharacter />} />
            </Route>
            <Route path="about" element={<About />} />
          </Route>

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;