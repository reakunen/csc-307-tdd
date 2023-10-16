import myFunctions from './sample-functions'

test('Testing mySum -- success', () => {
	const expected1 = 30
	const result1 = myFunctions.mySum(12, 18)
	expect(expected1).toBe(result1)

	const expected2 = 20
	const result2 = myFunctions.mySum(8, 12)
	expect(expected2).toBe(result2)
})

test('Creating an empty stock portfolio', () => {
	const portfolio = new myFunctions.StockPortfolio()
	expect(portfolio.getPortfolio()).toEqual([])
})

test('Check if the stock portfolio is empty', () => {
	const portfolio = new myFunctions.StockPortfolio()
	expect(portfolio.isEmpty()).toBe(true)
})

test('Count unique ticker symbols in the stock portfolio', () => {
	const portfolio = new myFunctions.StockPortfolio()
	portfolio.addStock('GME', 5)
	portfolio.addStock('RBLX', 10)
	portfolio.addStock('GME', 3) // Adding more shares of "GME"
	const uniqueCount = portfolio.countUniqueTickerSymbols()

	// Check if the count of unique ticker symbols is correct
	expect(uniqueCount).toBe(2)
})

test('Make a stock purchase and update the portfolio', () => {
	const portfolio = new myFunctions.StockPortfolio()

	// Add initial shares
	portfolio.addStock('AAPL', 10)

	// Make a purchase of 5 more shares
	portfolio.makePurchase('AAPL', 5)

	// Check if the updated shares are correct
	const updatedShares = portfolio.getShares('AAPL')

	expect(updatedShares).toBe(15)
})

test('Make a stock sale and update the portfolio', () => {
	const portfolio = new myFunctions.StockPortfolio()

	// Add initial shares
	portfolio.addStock('AAPL', 10)

	// Make a sale of 5 shares
	portfolio.makeSale('AAPL', 5)

	// Check if the updated shares are correct
	const updatedShares = portfolio.getShares('AAPL')
	expect(updatedShares).toBe(5)
})

test('Get the number of shares for a given symbol', () => {
	const portfolio = new myFunctions.StockPortfolio()

	// Add shares for a symbol
	portfolio.addStock('AAPL', 10)

	// Get the number of shares for "AAPL"
	const shares = portfolio.getShares('AAPL')

	// Check if the number of shares is correct
	expect(shares).toBe(10)
})

test('Portfolio keeps only owned symbols', () => {
	const portfolio = new myFunctions.StockPortfolio()

	// Add some stocks
	portfolio.addStock('AAPL', 10)
	portfolio.addStock('GOOGL', 1) // Adding a stock with zero shares

	// Get the list of owned symbols
	const ownedSymbols = portfolio.getOwnedSymbols()
	// Check if the list contains only symbols with at least one stock
	expect(ownedSymbols).toEqual(['AAPL', 'GOOGL'])
})


test('Attempt to sell more shares than owned should raise ShareSaleException', () => {
	const portfolio = new myFunctions.StockPortfolio()

	// Add some shares
	portfolio.addStock('AAPL', 10)

	// Attempt to sell more shares than owned
	const sellMoreShares = () => {
		portfolio.makeSale('AAPL', 15)
	}

	// Check if a ShareSaleException is raised with the correct message
	expect(() => sellMoreShares()).toThrow(myFunctions.ShareSaleException)
	expect(() => sellMoreShares()).toThrow('Cannot sell more shares than owned.')
})
