import './App.css';
import { Switch , Route } from 'react-router-dom';

import studentadd from './Components/Student Profile/Student Add/studentadd';
import auth from './Components/auth/auth'


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/studentadd' component={studentadd} />
        <Route exact path='/auth' component={auth} />
        
      </Switch>


    </div>
  );
}

export default App;
