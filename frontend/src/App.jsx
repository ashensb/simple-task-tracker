import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateUser from './pages/CreateUser';
import UserList from './pages/UserList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
