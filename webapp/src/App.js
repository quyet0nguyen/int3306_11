import React from 'react';
import './App.css';
import {connect} from 'react-redux'
import Layout from './components/Layout/Drawer'
import {Form} from 'antd'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './components/Home/HomePage'
import AccountPage from './components/Manage/ManageAccount/AccountPage'
import { fetchAccounts, createAccount, importAccounts, updateAccount } from './actions';
import ClassPage from './components/Manage/ManagerClass/ClassPage'
import ClassSectionPage from './components/Manage/ManageClassSection/ClassSectionPage'
import RoomPage from './components/Manage/ManageRoom/RoomPage'
import RequestManagerPage from './components/Manage/ManageRequest/RequestManager'
import Login from './components/Login'
import Register from './components/Register'

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAccounts());
  }

  onCreateAccount = ({username, password, role}) => {
    this.props.dispatch(createAccount({username, password, role}))
  }

  onImportAccounts = ({formData, role}) => {
    this.props.dispatch(importAccounts({formData, role}))
  }

  onUpdateAccount = ({id, body}) => {
    this.props.dispatch(updateAccount({id, body}))
  }
  render() {
    console.log(this.props)
    const WrappedLoginForm = Form.create({name: 'login'})(Login);
    return (
      <Router>
        
          <div>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route
                path="/signup"
                render={() => <Register
                />}
              />
              <Layout>
              <Route
                path="/home"
                render={() => <HomePage
                />}
              />
              <Route 
                path="/account-manager" 
                render={() => <AccountPage
                  accounts={this.props.accounts}
                  onCreateAccount={this.onCreateAccount}
                  onImportAccounts={this.onImportAccounts} 
                  onUpdateAccount={this.onUpdateAccount}
                />}
              />
              <Route 
                path="/class-manager" 
                render={() => <ClassPage
                />}
              />
              <Route 
                path="/class-section-manager" 
                render={() => <ClassSectionPage
                />}
              />
              <Route 
                path="/room-manager" 
                render={() => <RoomPage
                />}
              />
              <Route 
                path="/request-manager" 
                render={() => <RequestManagerPage
                />}
              />
              </Layout>
            </Switch>
          </div>
        
      </Router>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    accounts: state.accountReducer.accounts,
    rooms: state.roomReducer.rooms,
  }
}

export default connect(mapStateToProps) (App);
