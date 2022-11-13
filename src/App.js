import { 
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { theme } from './theme/base';
import { BaseLayout } from './layout/Base';
import Home from './pages/Home';
import UseState from './pages/UseState';
import UseEffect from './pages/UseEffect';
import UseContext from './pages/UseContext';
import UseReducer from './pages/UseReducer';
import UseRef from './pages/UseRef';

const sideItems = [
  {
    path: '/',
    text: 'Home'
  },
  {
    path: 'useState',
    text: 'useState'
  },
  {
    path: 'useEffect',
    text: 'useEffect'
  },
  {
    path: 'useContext',
    text: 'useContext'
  },
  {
    path: 'useReducer',
    text: 'useReducer'
  },
  {
    path: 'useRef',
    text: 'useRef'
  }
]

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <Routes>
            <Route path="/" element={<BaseLayout sideItems={sideItems}/>}>
              <Route path="" element={<Home/>}/>
              <Route path="useState" element={<UseState/>}/>
              <Route path="useEffect" element={<UseEffect/>}/>
              <Route path="useContext" element={<UseContext/>}/>
              <Route path="useReducer" element={<UseReducer/>}/>
              <Route path="useRef" element={<UseRef/>}/>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
