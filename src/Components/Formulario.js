
import React from "react";
import './Formulario.css';

const Formulario = (props) => {

    const cambiar = () => {
        props.cambiarRuta("https://pokeapi.co/api/v2/pokemon/?limit=51&offset=0");
    }

    return (
        <div>
            <button className="botoncito" onClick={cambiar}>Fetch Pokemon</button>
        </div>
    )
}

export default Formulario;