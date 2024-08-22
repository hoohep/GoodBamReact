import './style/main.css'
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Redirection from './components/Redirection';
import Join from './components/Join';
import Login from './components/Login';
import Sleep from './components/Sleep';
import List from './components/List';
import Result from './components/Result';
import Footer from './components/Footer';

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
                <Footer />  {/* 모든 페이지에 Footer 표시 */}
            </div>
        </BrowserRouter>
    );

}

export default App;
