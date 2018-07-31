import React, { Component } from 'react';
import Search from './Search';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="navbar">
          <h2 className="center ">Find Hotels</h2>
        </div>
        <Search></Search>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(App);
