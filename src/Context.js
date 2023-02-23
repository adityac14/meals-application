import React, {useContext} from 'react';

const AppContext = React.createContext()

// children is a special prop and that represents whatever we have in the component

const AppProvider = ({children}) => {
    return <AppContext.Provider value={{name: 'john', role: 'student'}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}