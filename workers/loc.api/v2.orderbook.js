'use strict'

const { Api } = require('bfx-wrk-api')

const { OrderBookUtil } = require('../util/orderbook.util');

class orderbookV2 extends Api {
  constructor(conf) {
    super(conf)

    this.sellOrders = new Map().set(1, 1);
    this.buyOrders = new Map().set(1, 1);
  }
  getHelloWorld(space, args, cb) {
    const name = args.name
    const res = 'Hello ' + name

    cb(null, res)
  }

  // execute sell order action
  sellOrder(space, args, cb) {
    try {
      this.orderBookUtil = new OrderBookUtil(this.sellOrders, this.buyOrders)

      const orderType = args.orderType
      const price = args.price
      const quantity = args.quantity
      const { sellOrders, buyOrders, executedQuantity } = this.orderBookUtil.matchOrder(orderType, price, quantity);
      this.sellOrders = sellOrders;
      this.buyOrders = buyOrders;
      const res = {
        sellOrders: Object.fromEntries(this.sellOrders),
        buyOrders: Object.fromEntries(this.buyOrders),
        executedQuantity: quantity
      }
      console.log('executed order: ', res);
      this.handleStream
      cb(null, res)
    } catch (error) {
      console.log('sellOrder error: ', error)
      cb(error, null)
    }

  }

  buyOrder(space, args, cb) {
    try {
      this.orderBookUtil = new OrderBookUtil(this.sellOrders, this.buyOrders)

      const orderType = args.orderType
      const price = args.price
      const quantity = args.quantity
      const { sellOrders, buyOrders, executedQuantity } = this.orderBookUtil.matchOrder(orderType, price, quantity);
      this.sellOrders = sellOrders;
      this.buyOrders = buyOrders;
      const res = {
        sellOrders: Object.fromEntries(this.sellOrders),
        buyOrders: Object.fromEntries(this.buyOrders),
        executedQuantity: executedQuantity
      }
      console.log('executed order: ', res);

      cb(null, res)
    } catch (error) {
      console.log('buyOrder error: ', error)
      cb(error, null)
    }

  }
}

module.exports = orderbookV2
