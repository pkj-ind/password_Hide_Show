import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator';
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
    this.validator = new SimpleReactValidator();
    
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
   
   if (this.validator.allValid()) {
    alert('You submitted the form and stuff!');
  } else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    // you can use the autoForceUpdate option to do this automatically`
    this.forceUpdate();
  }
   


  }  
  
  render(){
    return(
      <form className="App-form" onSubmit={this.onSubmit}>
      <label className="password">UserId
      <input type="text" className="userid__input" 
      name="userid"
      value={this.state.userid}
      onChange={this.handleChange}/> 
      {this.validator.message('userid', this.state.userid, 'required')}   
      </label> 
      <br /> 
      <label className="password">Password
      <input type={this.state.type} className="password__input"
       name="password"
       value={this.state.password}
       onChange={this.handleChange}/>
       {this.validator.message('password', this.state.password, 'required')}
      <span className="password__show" onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'}</span>
      </label>
      <br/>
      <button className="btn btn-primary btn-lg btn-block">Login</button>
      </form>
    )
  }
}

