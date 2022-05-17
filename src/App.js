import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Teste01 from './components/Teste01';
import Teste02 from './components/Teste02';
import HomePage from './components/Home/HomePage';
import SignUp from './components/SignUp/SignUp';
import Signin from './components/SignIn/Signin';
import Teste from './components/Tests/Teste';
import CustomizedSearch from './components/CustomizedSearch/CustomizedSearch';
import UserDataRegistration from './components/UserDataRegistration/UserDataRegistration';
import Profile from './components/Profile/Profile';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import DefaultTheme from './components/Themes/DefaultTheme';
import AnimePage from './components/AnimePage/AnimePage';
import ResetPassword from './components/ResetPassword/ResetPassword';

function App() {
  return (
    <>
      <ThemeProvider theme={DefaultTheme}>
        <CssBaseline />
        <HashRouter>
          <Routes>
            <Route path='/anime-jox/teste01' element={<Teste01 />} ></Route>
            <Route path='/teste02' element={<Teste02 />} ></Route>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/registration' element={<UserDataRegistration />} />
            <Route path='/customizedSearch' element={<CustomizedSearch />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/Anime/:id' element={<AnimePage />} />
            <Route path='/ResetPassword' element={<ResetPassword />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
