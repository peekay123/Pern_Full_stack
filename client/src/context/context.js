import React, {useState, createContext} from "react";

export const PetifyContext = createContext();

export const PetifyContextProvider = props => {
    const [pets, setPets] = useState([]);
    const addPets = (pet) => {
        setPets([...pets, pet])
    }

    return (
        <PetifyContext.Provider value={{pets, setPets, addPets}}>
            {props.children}
        </PetifyContext.Provider>
    )
}