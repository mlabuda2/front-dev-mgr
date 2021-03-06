import React, { Component } from "react";
import ComputerGameDetails from "./ComputerGameDetails";
import FormGame from "./Form";
const axios = require('axios')

class ListOfComputerGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      computerGamesDB: [],
      markedGame: {},
      cgame: {}
    // This binding is necessary to make `this` work in the callback
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.callAPI();
  }
  callAPI = async () => {
    await axios.get("http://localhost:4000/api/cgames/all")
        .then(res => {
          return res.data;
        })
        .then(res => {
          console.log(res)
          this.setState({ computerGamesDB: res, markedGame: {} })
        })
        .catch(error => {
          console.log(error.response)
        });
  };

  deleteGame = async (id) => {
    console.log(id)
    await axios.delete(`http://localhost:4000/api/cgames/${id}`)
        .then(res => {
          this.callAPI();
        })
        .catch(error => {
          console.log(error.response)
        });
  };
  editGame = async (game) => {
    console.log("LOG:",game)
    await axios.put(`http://localhost:4000/api/cgames/update/${game._id}`, {cgame: game})
        .then(res => {
          this.callAPI();
        })
        .catch(error => {
          console.log(error.response.data)
        });
  };
  handleSubmit = async (event, game) => {
    this.setState({ cgame: game });
    event.preventDefault();
    await axios.post("http://localhost:4000/api/cgames/add", { cgame: game })
        .then( res => {
          this.callAPI();
        })
  };

  render() {
    return (
      <div>
        <h1>Computer Games</h1>

        <ul>
          {this.state.computerGamesDB.map((x, i) => (
            <li onClick={(e) => this.setState({ markedGame: x })} key={i}>{x._name}</li>
          ))}
        </ul>
        <ComputerGameDetails game={this.state.markedGame} deleteGame={this.deleteGame} editGame={this.editGame}/>
        <FormGame handleSubmit={this.handleSubmit} mode="Add game" game={this.state.cgame} />
      </div>
    );
  }
}

export default ListOfComputerGames;