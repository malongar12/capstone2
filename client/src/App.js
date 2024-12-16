import React from 'react'; 
import Login from "../src/components/pages/Login.jsx"
import Register from "../src/components/pages/Register.jsx"
import CreatePost from './components/pages/CreatePost.jsx';
import HomePage from './components/pages/Home.jsx';
import NavHeader from './components/pages/NavHeader.jsx';
import SinglePost from './components/pages/SInglePost.jsx';
import Setting from './components/pages/Setting.jsx';
import "./App.css";
import EditPost from './components/pages/EditPost.jsx';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <NavHeader />
      <Routes>
        <Route path='/'  element={<HomePage />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/create/post' element={<CreatePost />} />
        <Route path='post/:id' element={<SinglePost/>} />
        <Route path='/setting/profile' element={<Setting />} />
        <Route path='/post/edit/:id' element={<EditPost />} />



      </Routes>
      
  
      
      </BrowserRouter>
 
    </div>
  );
}

export default App;
