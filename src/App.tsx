import { RootStateOrAny, useSelector } from "react-redux";
import Content from "./components/Content";

function App() {
  const theme = useSelector((state: RootStateOrAny) => state.theme);

  return (
    <div className={`${theme ? "light" : "darkness"}`}>     
            <div className='header'>Pokedex App</div>
          <Content/>
    </div>
  );
}

export default App;
