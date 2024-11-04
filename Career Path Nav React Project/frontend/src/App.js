import './App.css';
import { Switch , Route } from 'react-router-dom';

import studentadd from './Components/Student Profile/Student Add/studentadd';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/studentadd' component={studentadd} />
      </Switch>


    </div>
  );
}

export default App;
