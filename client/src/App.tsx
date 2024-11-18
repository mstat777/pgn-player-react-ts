import './App.scss';
import { useContext, useEffect, useState } from 'react';
import Loading from './components/Loading/Index';
import Header from './components/Header/Index';
import Home from './pages/Home/Index';
import Footer from './components/Footer/Index';
import { ThemeContext } from './context/ThemeProvider';

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { darkTheme } = useContext(ThemeContext);

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkTheme ? "dark" : "light"
        );
    },[darkTheme]);

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
