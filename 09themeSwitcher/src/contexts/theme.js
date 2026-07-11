import {createContext, useContext} from "react"

export const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {}
})

export const ThemeProvider = ({ children, value }) => (
    <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
)

export function useTheme(){
    return useContext(ThemeContext)
}