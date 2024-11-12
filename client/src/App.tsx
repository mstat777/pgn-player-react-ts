import './App.scss';
import { useState } from 'react';
import Loading from './components/Loading/Index';
import Header from './components/Header/Index';
import Main from './pages/Main/Index';
import Footer from './components/Footer/Index';

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        isLoading ?
            <Loading /> :
        <>
            <Header />
            <Main />
            <Footer />
        </>
    );
}

export default App;
