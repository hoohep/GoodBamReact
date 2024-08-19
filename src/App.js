import './App.css';
import { Route, Routes } from 'react-router-dom'
import Kakao from './components/Kakao';
import Redirection from './components/Redirection';

function App() {

    return (

        <div className="App">
            <h2>카카오</h2>

            <Routes>
                <Route path='/' element={<Kakao/>}></Route>
                <Route path='/kakao' element={<Redirection/>}></Route>
            </Routes>
        </div>

    );

}

export default App;
