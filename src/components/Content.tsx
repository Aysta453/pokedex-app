import { RootStateOrAny, useSelector } from "react-redux";
import List from './List'
import Menu from './Menu'

const Content = () => {
    const pokemonsInfo = useSelector((state: RootStateOrAny) => state.pokemonsInfo);
    const pokemonsInfoSource = useSelector((state: RootStateOrAny) => state.pokemonsInfoSource);
    
  return (
        <>
            <div className='pokemons'>
                Pokemons: {pokemonsInfo.length}/{pokemonsInfoSource.length}
            </div>
            <div className='content'>
                <Menu/>
                <List/>
            </div>
        </>
  )
}

export default Content