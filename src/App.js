import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Trending from './pages/Trending';
import ComingSoon from './pages/ComingSoon';
import WatchNow from './pages/WatchNow';
import { Provider } from 'react-redux';
import store from './store';
import AuthProvider from './components/Auth';
import TopMenu from './TopMenu';
import { useState } from 'react';
import { UserProvider } from './components/UserContext';
import { BsPeople } from 'react-icons/bs';
import Peoples from './pages/Peoples';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Provider store={store}>
      <BrowserRouter>
        
        <div className="App">
          
          <Routes>
            <Route index element={<Registration />} />
            <Route path="home" element={<Home />} className="main-wrapper" />
            <Route path="favourites" element={<Favourites />} />
            <Route path="trending" element={<Trending />} />
            <Route path="coming" element={<ComingSoon />} />
            <Route path="watchnow/:id" element={<WatchNow />} />
            <Route path="person/:id" element={<Peoples/>} />
          </Routes>
        </div>
       
      </BrowserRouter>
    </Provider>
  );
}

export default App;
