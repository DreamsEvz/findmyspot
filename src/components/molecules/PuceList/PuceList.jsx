const PuceList = ({ items }) => {
    return (
        <div style={{ width: 100 + '%'}} className='sm:mt-5'>
            <h5 className="text-2xl font-normal text-center leading-normal mt-0 mb-2 text-black-800">Liste des points</h5>
            <ul>
                {items.map((item, index) => (
                    <li className="m-auto w-3/4 p-5 shadow" key={index}>
                        <div>Point numéro : <span className="text-blue-800 font-bold">{index +1}</span></div>
                        <div>Nom : <span className="text-blue-800 font-bold">{item.name}</span> </div>
                        {item.description && <div>Description : <span className="text-blue-800 font-bold">{item.description}</span></div>}
                        <div>Coordonnées : <span className="text-blue-800 font-bold" >{item.lat}, {item.long} </span></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PuceList;