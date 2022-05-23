import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import Signin from './components/SignIn/Signin';
import CustomizedSearch from './components/CustomizedSearch/CustomizedSearch';
import Profile from './components/Profile/Profile';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import DefaultTheme from './components/Themes/DefaultTheme';
import AnimePage from './components/AnimePage/AnimePage';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Famous from './components/Famous/Famous';
import TheBest from './components/TheBest/TheBest';
import AnimesInfo from './components/AnimesInfo/AnimesInfo';

function App() {
  return (
    <>
      <ThemeProvider theme={DefaultTheme}>
        <CssBaseline />
        <HashRouter>
          <Routes>
            <Route path='/' element={<TheBest />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/ResetPassword' element={<ResetPassword />} />
            <Route path='/customizedSearch' element={<CustomizedSearch />} />
            <Route path='/Anime/:id' element={<AnimePage />} />
            <Route path='/Famous' element={<Famous />} />
            <Route path='/TheBest' element={<TheBest />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/animesInfo' element={<AnimesInfo />} />


          </Routes>
        </HashRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
