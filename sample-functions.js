function mySum(a, b) {
	return a + b
}

class ShareSaleException extends Error {
	constructor(message) {
		super(message)
		this.name = 'ShareSaleException'
	}
}

class StockPortfolio {
	constructor() {
		this.stocks = {} // Change this to an empty object
	}

	getPortfolio() {
		return Object.entries(this.stocks).map(([ticker, shares]) => ({
			ticker,
			shares,
		}))
	}

	isEmpty() {
		return Object.keys(this.stocks).length === 0
	}

	addStock(ticker, shares) {
		if (this.stocks[ticker]) {
			this.stocks[ticker] += shares
		} else {
			this.stocks[ticker] = shares
		}
	}

	countUniqueTickerSymbols() {
		return Object.keys(this.stocks).length
	}

	makePurchase(ticker, purchasedShares) {
		if (this.stocks[ticker]) {
			this.stocks[ticker] += purchasedShares
		} else {
			this.stocks[ticker] = purchasedShares
		}
	}

	makeSale(ticker, soldShares) {
		if (this.stocks[ticker]) {
			if (this.stocks[ticker] < soldShares) {
				throw new ShareSaleException('Cannot sell more shares than owned.')
			}
			this.stocks[ticker] -= soldShares
			if (this.stocks[ticker] <= 0) {
				delete this.stocks[ticker]
			}
		}
	}
  
	getOwnedSymbols() {
		return Object.keys(this.stocks)
	}

	getShares(ticker) {
		return this.stocks[ticker] || 0
	}
}

export default { mySum, StockPortfolio, ShareSaleException}
