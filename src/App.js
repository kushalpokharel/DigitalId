import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import SignUp from './components/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  );
}

export default App;
