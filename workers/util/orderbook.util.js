class OrderBookUtil {
  constructor (sellOrders, buyOrders) {
    this.sellOrders = sellOrders
    this.buyOrders = buyOrders
    console.log('sellOrders: ', this.sellOrders)
    console.log('buyOrders: ', this.buyOrders)
  }

  matchOrder (type, price, quantity) {
    const tagetOrderBook = type === 'buy' ? this.sellOrders : this.buyOrders
    const sourceOrderBook = type === 'buy' ? this.buyOrders : this.sellOrders
    // if order book has no liquidity in the provided price, add the order to the order book
    if (!tagetOrderBook.has(price)) {
      this.addOrderToOrderBook(type, price, quantity)
      return { sellOrders: this.sellOrders, buyOrders: this.buyOrders, executedQuantity: 0 }
    }
    // if order book has liquidity in the provided price, but not enough, add the order to the order book
    if (tagetOrderBook.get(price) < quantity) {
      // reduce the quantity of the order in the order book
      const reminingQuantity = quantity - tagetOrderBook.get(price)
      tagetOrderBook.set(price, 0)
      sourceOrderBook.set(price, sourceOrderBook.get(price) + reminingQuantity)
      // this.addOrderToOrderBook(type, price, reminingQuantity);
      return { sellOrders: this.sellOrders, buyOrders: this.buyOrders, executedQuantity: quantity - reminingQuantity }
    }
    // if order book has liquidity in the provided price, and enough, execute the order
    if (tagetOrderBook.get(price) >= quantity) {
      const reminingQuantity = tagetOrderBook.get(price) - quantity
      tagetOrderBook.set(price, reminingQuantity)
      // log the executed order
      return { sellOrders: this.sellOrders, buyOrders: this.buyOrders, executedQuantity: quantity }
    }
  }

  addOrderToOrderBook (type, price, reminingQuantity) {
    const orderBook = type === 'buy' ? this.buyOrders : this.sellOrders
    orderBook.set(price, orderBook.get(price) + reminingQuantity)
  }
}

module.exports = { OrderBookUtil }
