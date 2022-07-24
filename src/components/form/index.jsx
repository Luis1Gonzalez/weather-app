import './style.css'
import { useState } from 'react';

export default function Form({newLocation}){
    const [city, setCity] = useState("");
    const [countries, setCountries] = useState("");

    function onSubmit(e){
        e.preventDefault();
        // console.log({city});
        if(city=== "" || !city || countries===" || !countries")return;

        newLocation(city,countries);
        
    }

    return(
        <div className='container row d-flex'>
            <form onSubmit = {onSubmit}>
                <div className='wrap_form col mb-3 d-flex flex-column align-items-center'>
                    <input type="text" className='input-city col w-100 text-center fs-6 rounded p-2' placeholder="Ingresa una Ciudad" required onChange={(e) =>setCity(e.target.value)} />
                    <input type="text" className='input-country col my-3 text-center fs-6 w-100 rounded p-2' placeholder="Ingresa el País (Opcional)" maxlength="2" title="El nombre del país es opcional y debe ir en codigo ISO 3166-1 de dos letras" onChange={(e) =>setCountries(e.target.value)} />
                    <button className='btn btn-city' type="submit">Buscar</button>
                </div>

            </form> 
        </div>
    )
}