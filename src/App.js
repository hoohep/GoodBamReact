import './style/main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Redirection from './components/Redirection';
import Join from './components/Join';
import Login from './components/Login';
import Sleep from './components/Sleep';
import List from './components/List';
import Result from './components/Result';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
    
    return (

        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/kakao' element={<Redirection />}></Route>
                    <Route path="/sleep" element={<Sleep />} />
                    <Route path="/list" element={<List />} />
                    <Route path="/result" element={<Result />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );

}

export default App;
