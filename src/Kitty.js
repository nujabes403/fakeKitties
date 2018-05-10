import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getContract } from 'utils/contract'

import './KittyCard.scss'

import KittyCard from './KittyCard'
import Button from './components/Button/Button'

type Props = {
  
}

class Kitty extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      birthedKitty: null,
      myKitties: [],
      isLoading: false,
      kittyId: '',
      isKittyGenerating: false,
    }

    this.KittyBirthInstance = getContract('KittyBirth')
    this.KittyBirthWebsocketInstance = getContract('KittyBirth', 'websocket')
  }

  componentDidMount() {
    // kitty contract
    this.KittyBirthWebsocketInstance.events.Birth()
    .on('data', ({ returnValues }) => {
      if (returnValues) {
        console.log(returnValues)
        const { kittyAge, kittyId, level } = returnValues
        this.setState({
          isKittyGenerating: false,
          birthedKitty: {
            id: kittyId,
            age: kittyAge,
            level,
          },
        })
      }
    })
    .on('changed', (event) => console.log(event, 'changed'))
    .on('error', (event) => console.log(event, 'error!'))
  }

  generateKitty = () => {
    this.KittyBirthInstance.methods.generateKitty().send({
      from: this.props.wallet,
      gas: 2150000,
      gasPrice: '0',
    }, (err, res) => {
      console.log(err)
      if (!err) {
        this.setState({ isKittyGenerating: true })
        console.log("GENERATING KITTY!")
        console.log(res)
      }
    })
  }

  getKitties = () => {
    this.setState({ isLoading: true })
    this.KittyBirthInstance.methods.getKitties(this.props.wallet).call((err, res) => {
      this.setState({ isLoading: false })
      console.log(err)
      if (!err) {
        console.log("GET KITTIES!")
        console.log(res)
        this.setState({
          myKitties: res,
          birthedKitty: null
        })
      }
    })
  }

  getKittyInfo = () => {
    console.log(this.state.kittyId)
    this.KittyBirthInstance.methods.getKittyInfo(this.state.kittyId).call((err, res) => {
      console.log(res)
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { birthedKitty, myKitties, isLoading, isKittyGenerating } = this.state
    const { wallet } = this.props
    return (
      <div className="Kitty">
        My wallet account: {wallet ? wallet : 'loading...'}
        <br />
        <Button label="Generate Kitty" onClick={this.generateKitty} />
        <Button label="Get Kitties" onClick={this.getKitties} />
        {isLoading && 'Loading Kitties... wait..'}
        <br />
        <input name="kittyId" onChange={this.handleChange}/>
        <Button label="Get KittyInfo" onClick={this.getKittyInfo} />
        <br />
        {isKittyGenerating 
          ? 'kitty generating...'
          : birthedKitty && (
              <KittyCard
                imgId={birthedKitty.id % 600}
                age={birthedKitty.age}
                level={birthedKitty.level}
              />
            )
        }
        {(myKitties.length !== 0) && myKitties.map((kittyId) => (
          <KittyCard
            key={kittyId}
            imgId={kittyId % 600}
            age={kittyId}
            level={kittyId}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.web3.wallet,
    web3Instance: state.web3.web3Instance,
    web3WebsocketInstance: state.web3.web3WebsocketInstance,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Kitty)
