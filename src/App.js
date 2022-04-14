import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import SignUp from './components/SignUp';
import MiniDrawer from './components/NavBar';
import {useSelector, useDispatch} from 'react-redux';

function App() {
  // const address = useSelector(state => state.userReducer.address);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/home" element={<MiniDrawer/>}></Route>
    </Routes>
  );
}

export default App;
