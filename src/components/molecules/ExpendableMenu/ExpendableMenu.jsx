import React, { useState } from 'react';
import './style.css';

const ExpendableMenu = ({ changeAddPointState, changeDescriptionPoint, changeNamePoint }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const toggleMenu = () => {
        setIsOpen(!isOpen)
        isOpen ? changeAddPointState(false) : changeAddPointState(true);
    }

    const handleChangesName = (event) => {
        setName(event.target.value);
    }

    const handleChangesDescription = (event) => {
        setDescription(event.target.value);
    }

    return (
        <>
            
            <div className='flex flex-col m-auto p-10 shadow' style={{width:100 + '%'}}>
            <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={() => { toggleMenu(); }}>Ajouter un point</button>
                {isOpen && 
                    <div class="flex flex-wrap -mx-3 mt-5 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Nom du point
                            </label>
                            <input onChange={handleChangesName} value={name} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text"/>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Description du point
                            </label>
                            <textarea onChange={handleChangesDescription} value={description} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"></textarea>
                            <button className='bg-white hover:bg-gray-100 mt-7 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={() => { setIsOpen(false); changeNamePoint(name); changeDescriptionPoint(description); setName(null); setDescription(null); name || name !== '' ? changeAddPointState(true) : changeAddPointState(false)  }}>Valider</button>
                        </div>
                        
                    </div>
                }
            </div>
        </>
    );
}

export default ExpendableMenu;