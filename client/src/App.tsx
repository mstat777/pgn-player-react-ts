import './App.scss';
import { useState } from 'react';
import Loading from './components/Loading/Index';
import Header from './components/Header/Index';
import Home from './pages/Home/Index';
import Footer from './components/Footer/Index';

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        isLoading ?
            <Loading /> :
        <>
            <Header />
            <Home />
            <Footer />
        </>
    );
}

export default App;
