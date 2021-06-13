import React from 'react'
import Signup from './Signup'
// import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword';


function App() {
    return (



        <Router>
            <AuthProvider>
                <Switch>
                    <PrivateRoute exact path='/' component={Dashboard}></PrivateRoute>
                    <Route path="/signup" component={Signup}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/forgot-password" component={ForgotPassword}></Route>
                </Switch>
            </AuthProvider>
        </Router>


    )
}

export default App;
