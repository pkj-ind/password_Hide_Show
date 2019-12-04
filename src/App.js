import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userid:'',  
      type: 'password',
      password:''
     
    }
    this.showHide = this.showHide.bind(this);
    this.handleChange=this.handleChange.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
    
  }
  
  showHide(e){
    e.preventDefault();
    
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })  
  }
  
  handleChange(event){
      const {name,value}=event.target
      this.setState({[name]:value})
        
    }
  onSubmit(e){
   e.preventDefault()
   console.log(this.state.userid,this.state.password)
  }  
  
  render(){
    return(
      <form className="App-header" onSubmit={this.onSubmit}>
      <label className="password">UserId
      <input type="text" className="userid__input" placeholder="Enter UserId"
      name="userid"
      value={this.state.userid}
      onChange={this.handleChange}/>    
      </label>  
      <label className="password">Password
      <input type={this.state.type} className="password__input"
       placeholder="password"
       name="password"
       value={this.state.password}
       onChange={this.handleChange}/>
      <span className="password__show" onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'}</span>
      </label>
      <button className="btn">Login</button>
      </form>
    )
  }
}

