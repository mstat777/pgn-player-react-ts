import { ReactNode, createContext, useState } from "react";

interface ContextProps {
    darkTheme: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
    darkTheme: false,
    toggleTheme: () => {}
});

interface Props {
    children?: ReactNode;
}

const ThemeProvider = ({children}: Props) => {
    const [darkTheme, setDarkTheme] = useState<boolean>(false);

    const toggleThemeHandler = () => {
        setDarkTheme((prevState) => !prevState);
    }

    return (
        <ThemeContext.Provider
            value={{
                darkTheme: darkTheme,
                toggleTheme: toggleThemeHandler
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;