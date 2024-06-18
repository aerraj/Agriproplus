
import './App.css'
import Home from './screens/Home';
import Login from './screens/Login';
import Library from './screens/Library';
import News from './screens/News';
import Schemes from './screens/Schemes';
import CropRecommendation from './screens/CropRecommendation';
import Signup from './screens/Signup';
import Support from './screens/Support';
import {

  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {


  return (
    <>
     <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} ></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/library" element={<Library/>} ></Route>
          <Route exact path="/crops" element={<CropRecommendation/>}></Route>
          <Route exact path="/news" element={<News/>}></Route>
          <Route exact path="/schemes" element={<Schemes/>}></Route>
          <Route exact path="/support" element={<Support/>}></Route>
        </Routes>
      </div>    
    </Router>      
    </>
  )
}

export default App
