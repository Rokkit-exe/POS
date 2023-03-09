import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Connection from './pages/Connection';
import Edit from './pages/Edit';
import HomePage from './pages/HomePage';
import Main from './pages/Main';
import Table from './pages/Table';
import Pivot from './pages/Pivot';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Connection/>}/>
          <Route path='/connection' element={<Connection/>} />
          <Route path='/main' element={<Main/>}/>
          <Route path='/table' element={<Table/>}/>
          <Route path='/pivot' element={<Pivot/>}/>
        </Routes>
      </Router>    
  );
}

export default App;
