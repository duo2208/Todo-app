import {createContext, useState, useEffect, useContext} from 'react';

export const DarkModeContext = createContext();

// 자식 컴포넌트들에게 데이터를 전달해줄 수 있는 umbrella.
export function DarkModeProvider({children}) {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        updateDarkMode(!darkMode);
    };

    useEffect(()=> {
        const isDark = () => {
            if (localStorage.theme === 'dark' ||
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));
            setDarkMode(isDark);    // 리액트 내부의 state를 먼저 업데이트
            updateDarkMode(isDark); // html에 다크 클래스를 넣을건지 아닌지 판단하는 updateDarkMode 함수를 업데이트
        }
    })

    return <DarkModeContext.Provider value={{darkMode: darkMode, toggleDarkMode}}>
        {children}
    </DarkModeContext.Provider>
}

function updateDarkMode(darkMode) {
    if(darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    }
};

export const useDarkMode = () => useContext(DarkModeContext);