import './Lista.css';
import { useState, useEffect } from "react";
import axios from 'axios';

const Lista = (props) => {

    const [lista, setLista] = useState([]);
    const [rutaPrevious,setRutaPrevious] = useState("");
    const [rutaNext,setRutaNext] = useState("");

    useEffect(() => {
        if (props.ruta != null) {
            axios.get(props.ruta)
                .then(response => {
                    
                    let data = response.data.results;
                    let resultados = [];
                    setRutaNext(response.data.next);
                    setRutaPrevious(response.data.previous);
                    for (let index = 0; index < data.length; index++) {
                        axios.get(data[index].url)
                        .then(response2=>{
                            console.log(response2);

                            let img = (response2.data.sprites.other.dream_world.front_default != null) ? 
                            response2.data.sprites.other.dream_world.front_default : 
                            response2.data.sprites.other.home.front_default;

                            let tipos = [];

                            for (let i = 0; i < response2.data.types.length; i++) {
                                tipos.push(response2.data.types[i].type.name)
                            }

                            let aux = {
                                name : data[index].name,
                                imagen : img,
                                tipos: tipos
                            }

                            resultados.push(aux);
                            setLista([...resultados]);
                            // setLista(resultados);
                        })
                        .catch(err2 => {
                            console.log(err2);
                        });
                    }
                    
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [props.ruta]);

    const cambiarRuta  = (event) => {
        console.log(event.target.id);
        if(event.target.id === "bprevious") {
            if(rutaPrevious != null) {
                props.setRuta(rutaPrevious);
                props.setCantidad(props.cantidad-51);
            }
        } else {
            if(rutaNext != null) {
                props.setRuta(rutaNext);
                props.setCantidad(props.cantidad+51);
            }
        }
    }

    return (
        <div className='container'>
            {
                lista.map((poke,index)=>{
                    return(
                        <div className='cuadrito' key={index}>
                            <span>{index+props.cantidad}. {poke.name}</span>
                            <div>
                                <img className="imgPokemon" src={poke.imagen} alt={"imagen de "+poke.name}/>
                            </div>
                            <div className='tipos'>
                            {
                                poke.tipos.map((tipo,index)=>{
                                    return (
                                        <div key={"tipo"+index}>
                                            <span>{tipo}</span>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    )
                })
            }
            {
                (lista.length > 0) ? 
                <div id="botones">
                    <div className='divPrevious'>
                        <button id="bprevious" onClick={(e)=>cambiarRuta(e)}>Previous</button>
                    </div>
                    <div className='divNext'>
                        <button id="bnext" onClick={(e)=>cambiarRuta(e)}>Next</button>
                    </div>
                </div>
                : ""
            }
        </div>
    );
}

export default Lista;