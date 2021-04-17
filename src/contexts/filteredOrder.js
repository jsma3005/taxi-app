import {createContext, useState} from 'react';
import React from 'react';

export const FilteredOrderContext = createContext([{}, () => {}]);

export const FilteredOrderProvider = ({children}) => {
    const [state, setState] = useState({
        fromState: '',
        toState: '',
        dateState: null,
        buttonState: false
    });
    
    return(
        <FilteredOrderContext.Provider value={[state, setState]}>
            {children}
        </FilteredOrderContext.Provider>
    )
};