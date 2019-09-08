import React, { Component } from 'react';
import Geocode from "react-geocode";
import axios from "axios";

Geocode.setApiKey('AIzaSyAXG2Rdze1lBz75sfByEceCRKLLkRTqO-Y');
class MainFinder extends Component{

  constructor(props){
    super(props);
    this.state = {address : "",response:"",error:""};

  }
  convertToLat(){
    return Geocode.fromAddress(this.state.address)
    .then(
      response => {
        // console.log(response.results[0].geometry.location);
        return response.results[0].geometry.location; 
      },
      error => {
        return Promise.reject(error);
      }

    )
  }
  async hitApi(){
    try{
      let apiReturn = await this.convertToLat();
      console.log(apiReturn,"apiReturn")
      axios.get(`http://localhost:3000/get?latitude=${apiReturn.lng}&longitude=${apiReturn.lat}`)
      .then((response) => {
        console.log(response.data)
        this.setState({response:response.data})
        console.log(response,"dasdsa");
        // console.log(response);
      })
      .catch((e) => {
        console.log(e,"Error");
      })

    }catch(e){
      this.setState(error:e)
    }
  }

  render(){
    return(
        <div>
          <label>
            Location :
            <input 
              type="text" 
              name="name"
              onChange={e => this.setState({address: e.target.value})}
            />
          </label> 
          <input type="button" value="Submit" 
            onClick = {this.hitApi.bind(this)}

          />
          {this.state.response ?
            <h1> 
              {this.state.response}
            </h1>
            :
            <br/>
          }
          
        </div>
    );
  }
}

export default MainFinder

