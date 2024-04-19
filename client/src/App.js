import './App.css';
import { BrowserRouter, Route,Routes} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin'
import User from './pages/User';
import Quiz from './pages/Quiz'
import Add_question from './pages/Add_question'
import Submit from './pages/Submit';
import Form from './pages/Form'
import UserData from './pages/UserData'
function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/Admin' element={<Admin/>}/>
            <Route path='/user' element={<User/>}/>
            <Route path='/quiz' element={<Quiz/>}/>
            <Route path='/add-question' element={<Add_question/>}/>
            <Route path='/submit' element={<Submit/>}/>
            <Route path="/form" element={<Form/>}/>
            <Route path='/userdata' element={<UserData/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;