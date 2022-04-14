import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import SignUp from './components/SignUp';
import MiniDrawer from './components/NavBar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/navbar" element={<MiniDrawer/>}></Route>
    </Routes>
  );
}

export default App;
