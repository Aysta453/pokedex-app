import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";

interface Type {
  type: { name: string };
}

interface Pokemon {
  name: string;
  url: string;
  types: Array<Type>;
  sprites: {
    [key: string]: string;
  };
  weight: number;
  height: number;
}
const ListItem = ({ pokemon, i }: { pokemon: Pokemon; i: number}) => {
  const [showSize, setShowSize] = useState(false);
  const handleSize = () => {
    setShowSize(!showSize);
  };
  return (
      <div  className='list-item' onClick={() => { handleSize();}}>
        <div className='image'>
          <img src={pokemon.sprites["front_default"]} alt="" />
        </div>
        <div className='pokeInfo'>
          <div className='pokeName'>{i+1} {pokemon.name}</div>
          <div className='pokeTypes'>
            {pokemon.types.map((type: Type) => {
              return <div key={type.type.name} className={`pokeType ${type.type.name}`}> {type.type.name}</div>
            })}
          </div>
          {showSize?  
            <div className='pokeSize'>
              <span>height <b>{pokemon.height}</b></span>
              <span>weight <b>{pokemon.weight}</b></span>
            </div>
           :('')}     
        </div>
      </div>
  );
};

const List = () => {
  const pokemonsInfo = useSelector((state: RootStateOrAny) => state.pokemonsInfo);

  return (

    <div className='list-contener'>
       {pokemonsInfo.map((pokemon: Pokemon, i: number) => {
        return <ListItem key={pokemon.name} pokemon={pokemon} i={i} />;
      })}
      {pokemonsInfo.length === 0 ? <div className="error"> No pokemons.</div> : ''}
    
      </div>
 
  
  )
}
export default List