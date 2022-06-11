
import './App.css';
import CardsDetails from './components/CardsDetails';
import Header from './components/Header';
import {Route,Routes} from 'react-router-dom'
import Cards from './components/Cards';
import CardsData from './components/CardsData';
import { useState } from 'react';
import Home from './components/Home';

function App() {
  const [data, setData] = useState(CardsData);
  const[Input,setInput]=useState('');
  return (
 
    <div className="App">
     <Header Input={Input} setInput={setInput}/>
     <Routes>
     <Route path='/cart/:id' element={<CardsDetails data={data} />} />
  <Route path='/' element={<Cards data={data}  Input={Input} />}/>
  <Route path='/Home' element={<Home/>}/>
     </Routes>
    </div>
  );
}

export default App;
