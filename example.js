'use strict'

const Grenache = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')

const Peer = Grenache.PeerRPCClient

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new Peer(link, {})
peer.init()

const sellQuery = {
  action: 'sellOrder',
  args: [{
    price: 1, quantity: 10, orderType: 'sell'
  }]
}

const buyQuery = {
  action: 'buyOrder',
  args: [{
    price: 1, quantity: 0.01, orderType: 'buy'
  }]
}

setInterval(() => {
  peer.request('orderbook:v2', sellQuery, { timeout: 10000 }, (err, data) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log('query response:')
    console.log(JSON.stringify(data))
    console.log('---')
    // process.exit(0)
  })
  peer.request('orderbook:v2', buyQuery, { timeout: 10000 }, (err, data) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log('query response:')
    console.log(JSON.stringify(data))
    console.log('---')
    // process.exit(0)
  })
}, 1000)
