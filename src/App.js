import React, { Component,Fragment } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import './App.css';
import axios from 'axios';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userid:'',  
      type: 'password',
      password:'',
      persons:[]
     
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

  const user = {
    name: this.state.userid,
    "email":"Rey.Padberg@karina.biz"
  };

  axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
   
  }  

  // componentDidMount(){

  //     axios.get(`https://jsonplaceholder.typicode.com/users`)
  //     .then(res => {
  //       const persons = res.data;
  //      this.setState({ persons });
  //     })
  // }
 
    componentDidMount = async () =>{

      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        console.log(res.status)
        console.log(res.data)
        const persons = res.data;
        this.setState({ persons })
      } catch (error) {
        
      }
    
   
  }
  
  render(){
    return(
      <Fragment>
        <h1>Please Login to your account.</h1>
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
      <div>
        <p>Below are the fetched user</p>
        <ul>
        { this.state.persons.map(person => <li key={person.id}>{person.name}</li>)}
      </ul>
      </div>
      </Fragment>
    )
  }
}

