import React, { Component } from 'react'
import Header from '../Header/Header'

export class GuestWrapper extends Component {
  componentDidMount() {
    document.title = 'WatchMyKeys - ' + this.props.title
  }
  render() {
    return (
      <div className="container">
        <Header title={this.props.title} />
        {this.props.children}
      </div>
    )
  }
}

export class AuthWrapper extends Component {
  componentDidMount() {
    document.title = 'WatchMyKeys - ' + this.props.title
  }
  render() {
    return (
      <div className="container">
        <Header title={this.props.title} auth />

        {this.props.children}
      </div>
    )
  }
}
