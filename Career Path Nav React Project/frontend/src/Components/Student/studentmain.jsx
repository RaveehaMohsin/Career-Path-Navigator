import React from 'react';
import Navbar1 from '../Navbar/navbar';
import Dashboard from '../SideDashboard/dashboard';
import Studentadd from './Student Add/studentadd';
import { Route, Switch } from 'react-router-dom';
<<<<<<< Updated upstream
import StudentInterestAdd from './Student Interest Details/StudentInterestAdd';
import Careerrecommendation from './Career Recommendation/careerrecommendation';
=======
<<<<<<< HEAD
import StudentInterestAdd from './Student Interest Dtails/StudentInterestAdd';
import StudentView from './Student View/studentView';
=======
import StudentInterestAdd from './Student Interest Details/StudentInterestAdd';
import Careerrecommendation from './Career Recommendation/careerrecommendation';
>>>>>>> 50a7a6ef08c19ab69c42c85317bbb2502fe9b97c
>>>>>>> Stashed changes

export default function StudentMain() {
  return (
    <div>
      <div className="navbar">
        <Navbar1 />
      </div>
      <div style={{ display: "flex" }}> 
        <Dashboard />
        <div className="main-content">
          <Switch>
            <Route exact path='/studentprofile/studentadd' component={Studentadd} />
<<<<<<< Updated upstream
            <Route exact path='/studentprofile/interestsadd' component={StudentInterestAdd} />
            <Route exact path='/student/careerrecommendation' component={Careerrecommendation} />
=======
<<<<<<< HEAD
            <Route exact path='/studentprofile/studentinterestadd' component={StudentInterestAdd} />
            <Route exact path='/studentprofile/studentview' component={StudentView} />
=======
            <Route exact path='/studentprofile/interestsadd' component={StudentInterestAdd} />
            <Route exact path='/student/careerrecommendation' component={Careerrecommendation} />
>>>>>>> 50a7a6ef08c19ab69c42c85317bbb2502fe9b97c
>>>>>>> Stashed changes
          </Switch>
        </div>
      </div>
    </div>
  );
}
