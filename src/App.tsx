import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocalStorage } from 'react-use';
import { Home } from './pages/Home';
import { Downloads } from './pages/Downloads';
import { AppContextProvider } from './context/AppContext';
import { NavBar } from './components/NavBar';
import { ParticleBackground } from './components/ParticleBackground';

function App() {
  const [currentPage, setCurrentPage] = useLocalStorage<'home' | 'downloads'>('current-page', 'home');
  
  return (
    <AppContextProvider>
      <div className="flex flex-col h-full">
        <ParticleBackground />
        
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 relative z-10">
          <AnimatePresence mode="wait">
            {currentPage === 'home' && <Home key="home" />}
            {currentPage === 'downloads' && <Downloads key="downloads" />}
          </AnimatePresence>
        </main>
        
        <NavBar currentPage={currentPage || 'home'} setCurrentPage={setCurrentPage} />
      </div>
    </AppContextProvider>
  );
}

export default App;