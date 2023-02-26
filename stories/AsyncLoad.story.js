import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

import Board from '../src'
const baselink = 'iframe.html?id=advanced-features--async-load-data&viewMode=story&'
const getLinks = links => {
  return links
    .map(link => (
      <span>
        <a href={baselink + link.href}>
          <img src={link.icon} style={{ borderRadius: '50%', verticalAlign: 'middle' }} />
          {link.label}
        </a>
      </span>
    ))
    .reduce((prev, curr) => [prev, ' | ', curr])
}
class AsyncBoard extends Component {
  state = {
    links: [],
    data: { lanes: [{ id: 'loading', title: 'loading..', cards: [] }] }
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlParams)
    const type = params.type ?? ''
    fetch('http://localhost:3000/filters')
      .then(res => res.json())
      .then(data => {
        this.setState({ links: data })
      })

    fetch('http://localhost:3000/dashboard/' + type + window.location.search)
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data })
      })
  }

  onDragEnd = (cardId, sourceLandId, targetLaneId, card, card2) => {
    // debug('Calling onDragENd')
    console.log(cardId, card, sourceLandId, targetLaneId, card2)
    // const updatedData = update(draggedData, {lanes: {[laneIndex]: {cards: {[cardIndex]: {cardColor: {$set: '#d0fdd2'}}}}}});
    // this.setState({boardData: updatedData});
  }

  changeLocation = (key, value) => {
    if ('URLSearchParams' in window) {
      var searchParams = new URLSearchParams(window.location.search)
      searchParams.set(key, value)
      window.location.search = searchParams.toString()
    }
  }

  render() {
    return (
      <>
        <div className="sticky">
          <span>Type: <a onClick={() => {this.changeLocation('type', 'requirement')}}> 📝 Requirements</a></span> | 
          <span><a onClick={() => {this.changeLocation('type', 'task')}}> 🔨 Tasks</a></span> | 
          <span><a onClick={() => {this.changeLocation('type', 'incident')}}> 🔥 Incidents</a></span>
          {this.state.links.map(g => (
            <p>
              {g.name}: {getLinks(g.links)}
            </p>
          ))}
        </div>
        <Board data={this.state.data} handleDragEnd={this.onDragEnd} />
      </>
    )
  }
}

storiesOf('Advanced Features', module).add('Async Load data', () => <AsyncBoard />, {
  info: 'Load board data asynchronously after the component has mounted'
})
