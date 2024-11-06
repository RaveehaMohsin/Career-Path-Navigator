import './App.css';
import { Switch , Route } from 'react-router-dom';
import studentmain from './Components/Student/studentmain';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/profile/studentadd' component={studentmain} />
        <Route exact path='/studentinterestadd' component={studentmain} />
      </Switch>
    </div>
  );
}

export default App;
