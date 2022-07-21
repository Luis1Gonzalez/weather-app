import './style.css'
import { useState } from 'react';

export default function Form({newLocation}){
    const [city, setCity] = useState("");

    function onSubmit(e){
        e.preventDefault();
        // console.log({city});
        if(city=== "" || !city) return;

        newLocation(city);
        
    }

    return(
        <div className='container row'>
            <form onSubmit = {onSubmit}>
                <div className='col input-group mb-3 mx-auto'>
                    <input type="text" className='input-city form-control' placeholder="Ciudad" onChange={(e) =>setCity(e.target.value)} />
                    <button className='btn btn-city input-group' type="submit">Buscar</button>
                </div>

            </form> 
        </div>
    )
}