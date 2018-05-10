import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return this.props.web3Instance && (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    web3Instance: state.web3.web3Instance,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
