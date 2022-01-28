import { Home } from '@material-ui/icons';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Authpage from './components/Authpage';
import Homepage from './components/Homepage';
import Registration from './components/signin';

function App() {
  return (
    
    <BrowserRouter>
    <div className="header"> 
     <ul>
      <Link to={"/"} ><li> <h1>task <Home/></h1></li></Link>
      <Link to={"/auth"} ><li> login</li></Link>
     </ul>
    
    </div>


    <Routes>
    <Route path= {"/"} element={  <Homepage/>}/>

      <Route path= {"/auth"} element={ <Registration/>}/>
      <Route path= {"/authpage"} element={ <Authpage/>}/>
    </Routes>
      

    </BrowserRouter>
  );
}

export default App;


