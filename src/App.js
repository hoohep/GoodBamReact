import './style/main.css'
import Header from './components/Header';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Home from './components/Home';
import Redirection from './components/Redirection';
import Join from './components/Join';
import Login from './components/Login';
import Sleep from './components/Sleep';
import List from './components/List';
import Result from './components/Result';
import Footer from './components/Footer';
import ProtectedRoute from './customHook/ProtectedRoute';


function App() {
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    return (

        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route
                        path="/sleep"
                        element={
                            <ProtectedRoute
                            element={<Sleep />}
                          />
                        }
                    /> */}
                    <Route path='/kakao' element={<Redirection />}></Route>

                    <Route path="/sleep" element={<Sleep />} />
                    <Route path="/list" element={<List />} />
                    <Route path="/result" element={<Result />} />
                </Routes>

            </div>
        </BrowserRouter>
    );

}

export default App;
