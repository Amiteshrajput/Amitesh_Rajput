import './App.css';

import Navs from './Navs';
import UserContextProvider from './Contexts/UserContext';


function App() {
  return (
    <div className='app'>
      <UserContextProvider>
        <Navs/>
      </UserContextProvider>  
    </div>
  );
}

export default App;
