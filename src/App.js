import React from "react";
import Firebase from "firebase";
import config from "./config";

class App extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);

     this.state = {
	   relay : 0,
       dist_cm : 0
     };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
	let ref = Firebase.database().ref("/ultrasonics/");
	ref.on('value', (snapshot) => {
	  const state = snapshot.val();
	  this.setState(state);
	});	
  };
  
  shoot = () => {
	if(this.state.relay == 0) 	 { this.state.relay = 1; }
							else { this.state.relay = 0; }												
	this.writeUserData();
  }
  
  writeUserData = () => {
    Firebase.database()
      .ref("/ultrasonics/")
      .set(this.state);
    console.log("DATA SAVED");
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
		  <h1>Live Results & Commands:</h1>
		  <hr/>
          <h3>Distance: {this.state.dist_cm} cm</h3>
		  <button onClick={() => this.shoot()}>Relay [{this.state.relay==0?'OFF':'ON'}]</button>
		  <hr/>
		  <p>Example created by <a href="https://www.linkedin.com/in/zeljkoeremic/">Željko Eremić, PhD</a></p>
		</div>
      </React.Fragment>
    );
  }
}

export default App;