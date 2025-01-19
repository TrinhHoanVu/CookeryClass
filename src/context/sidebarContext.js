// import React, {createContext, useContext, useReducer} from "react";
// import reducer from "../reducers/sidebarReducer";
// import {
//     OPEN_SIDEBAR,
//     CLOSE_SIDEBAR
// } from "../actions/actions";

// const initialState = {
//     isSidebarOpen: false
// }

// const SidebarContext = createContext({});

// export const SidebarProvider = ({children}) => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     const openSidebar = () => {
//         dispatch({type: OPEN_SIDEBAR});
//     }

//     const closeSidebar = () => {
//         dispatch({ type: CLOSE_SIDEBAR });
//     }

//     return (
//         <SidebarContext.Provider value = {{
//             ...state,
//             openSidebar, 
//             closeSidebar
//         }}>
//             {children}
//         </SidebarContext.Provider>
//     )
// }

// export const useSidebarContext = () => {
//     return useContext(SidebarContext);
// }
import { createContext, useContext, useState } from 'react';

// Tạo Context
const SidebarContext = createContext();

// Hook tùy chỉnh để sử dụng Sidebar Context
export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebarContext phải được sử dụng trong SidebarProvider');
    }
    return context;
};

// Sidebar Provider component
export const SidebarProvider = ({ children }) => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(prevState => !prevState);
    };

    return (
        <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};