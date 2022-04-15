
import React,{useEffect,useState} from 'react';
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {fetchNames, handleSearching, changeSearchName, changeSearchType,changeTheme } from "../redux/features/data";

const Menu = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootStateOrAny) => state.theme);

  const [inputName, setInputName] = useState("");
  const [inputType, setInputType] = useState("");

  const handleSearchName = (value: string) => {
    setInputName(value);
    dispatch(changeSearchName(value));
    dispatch(handleSearching());
  };

  const handleSearchType = (value: string) => {
    setInputType(value);
    dispatch(changeSearchType(value));
    dispatch(handleSearching());
  };

  const fetchData = () => {
    dispatch(fetchNames());
    dispatch(handleSearching());
  };
  const handleTheme=()=>{
    dispatch(changeTheme());
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='menu'>
       <div className='changeTheme'>
            <button onClick={()=>{handleTheme()}}>Change To {!theme ? 'light' : 'dark'} Theme</button>
       </div>
       <div className='filters'>
            <div className='title'>
              Filters 
            </div>
            <div className='filter'>
                <span>Name</span>
                <input  type="text" onChange={(evt) => {  handleSearchName(evt.target.value); }}value={inputName}/>
            </div>
            <div className='filter'>
                <span>Type</span>
                <input type="text" onChange={(evt) => { handleSearchType(evt.target.value);}}value={inputType}/>
            </div>
        </div>
        <div className='loadData'>
            <button onClick={()=>{fetchData()}}>More Pokemons</button>
       </div>
    </div>
  )
}

export default Menu