import Showgrid from './componenets/Showgrid';
import About from './componenets/About';
import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  return (
    <Router>
        <Routes>
        <Route path='/'>
          <Route index element={<Showgrid></Showgrid>}/>
          <Route path='about' element={<About></About>}></Route>
        </Route>
        </Routes>
    </Router>
  );
}

export default App;
