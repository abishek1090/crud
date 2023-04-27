
import './App.css';
import Home from './Screen/Home';
import Login from './Screen/Login';
import {Routes, Route} from 'react-router-dom'
import Signup from './Screen/SignUp';



function App() {
  return (
    <div>
      
       <Routes>
         <Route path='/home' element={<Home />} />
         <Route path='/' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
       </Routes>
    </div>
  );
}

export default App;
