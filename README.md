# Overview

This is a simple library for interacting with Robinhood's internal API.  I wanted to make a simple web client for my personal use, and figured it'd be nice to roll my own library with support for the calls I needed.  If you find yourself wanting more, read below to see how to contribute.  Sorry that the documentation is pretty anemic, but I would much rather be working on other things :P

This app is written using async/await so you'll need a minimum node/npm version that supports this style of syntax. 

# Want to add a missing call? 

You should be able to easily add any missing calls to the file ./api/calls.js.  Not sure how the calls work? This was built from reading https://github.com/sanko/Robinhood.  If you want to see it added to this package, go ahead and send a pull request.

# List available methods: 

```javascript
  const RobinHood = require('robinhood-api');
  const robinhood = new RobinHood();

  console.log(robinhood.listCalls()); //This will print all of the available API calls this library can do.
```

# Example Usage: 

```javascript
const RobinHood = require('robinhood-api');
const robinhood = new RobinHood();

(async () => {
  try{
    let loginResult = await robinhood.login({ username:'email@test.com', password:'mycoolpassword' });

    let myUserData = await robinhood.getUserData();
    console.log(myUserData);
  }catch(e){
    console.log('Oh noes! Login probably failed!', e);
  }
})();
```

# Dealing with response URLs

If you get a "next" token, or account, instrument, etc (URLs in API responses that when requested will resolve assets), you can simply request that location with the getResource() method.

```javascript
  let someCoolResource = await robinhood.getResource(someResourceUrl);
```

# General API Calls 
## robinhood.login(opts)
Login to RobinHood with your user credentials.
### Options
* username - Required: true
* password - Required: true
## robinhood.mfaCode(opts)
Login using a two-step authentication code.
### Options
* username - Required: true
* password - Required: true
* mfa_code - Required: true
## robinhood.getACHRelationships(opts)
Get the ACH methods associated with this account.
### Options
## robinhood.getACHRelationship(opts)
Get an ACH relationship by ID (retrieved by getACHRelationships())
### Options
* relationship_id - Required: true
## robinhood.automaticACHTransfer(opts)
Add a scheduled ACH transfer to fund this account.
### Options
* ach_relationship - Required: true
* amount - Required: true
* frequency - Required: false (Valid Values: weekly,biweekly,monthly,quarterly)
## robinhood.getAutomaticACHTransfer(opts)
Get scheduled ACH transfers.
### Options
## robinhood.ACHTransfer(opts)
Perform a one time ACH transfer to or from your bank account.
### Options
* amount - Required: true
* ach_relationship - Required: true
* direction - Required: true (Valid Values: withdraw,deposit)
## robinhood.getACHTransfer(opts)
Get list of one time ACH transfers to or from your bank account.
### Options
## robinhood.getUserData(opts)
Get the user's basic account information.
### Options
## robinhood.getAccounts(opts)
Get the accounts associated with the user credentials.
### Options
## robinhood.getUserInvestmentProfile(opts)
Get the user's investment profile.
### Options
## robinhood.getPositions(opts)
Get the current stock positions being held.
### Options
* nonzero - Required: false (Valid Values: true,false)
## robinhood.getPortfolio(opts)
Get the user's portfolio by account ID
### Options
* account_number - Required: true
## robinhood.getHistoricals(opts)
Get the user's portfolio historicals
### Options
* account_number - Required: true
* interval - Required: false (Valid Values: week,day,10minute,5minute)
* span - Required: false (Valid Values: day,week,year,5year,all)
## robinhood.getTickerHistoricals(opts)
Get historicals for a particular symbol
### Options
* symbol - Required: true
* interval - Required: false (Valid Values: week,day,10minute,5minute)
* span - Required: false (Valid Values: day,week,year,5year,all)
## robinhood.getOrder(opts)
Get an order via the order_id parameter.
### Options
* order_id - Required: true
## robinhood.getRecentOrders(opts)
Get recently placed orders.
### Options
* updated_at - Required: false
* instrument - Required: false
* cursor - Required: false
## robinhood.placeOrder(opts)
Buy or sell a security.
### Options
* account - Required: true
* instrument - Required: true
* symbol - Required: true
* type - Required: true (Valid Values: market,limit)
* time_in_force - Required: true (Valid Values: gfd,gtc,ioc,fok,opg)
* trigger - Required: true (Valid Values: immediate,stop)
* price - Required: false
* stop_price - Required: false
* quantity - Required: true
* side - Required: true (Valid Values: buy,sell)
* extended_hours - Required: false (Valid Values: true,false)
* override_day_trade_checks - Required: false (Valid Values: true,false)
* override_dtbp_checks - Required: false (Valid Values: true,false)
## robinhood.cancelOrder(opts)
Cancel an active order
### Options
* order_id - Required: true
## robinhood.getInstruments(opts)
Get instruments list.
### Options
* query - Required: false
## robinhood.getQuotes(opts)
Get quote on a security via ticker symbols (comma separated list)
### Options
* symbols - Required: true
## robinhood.getQuote(opts)
Get quote on a single security via ticker symbol
### Options
* symbol - Required: true
## robinhood.getMarkets(opts)
Get market data for the different exchanges
### Options
## robinhood.getFundamentals(opts)
Get fundamental data for ticker symbols (comma separated list)
### Options
* symbols - Required: true
## robinhood.getWatchlists(opts)
Get list of watchlists for a user
### Options
## robinhood.reorderWatchlist(opts)
Reorder a watchlist.  UUIDs is a list of instrument URLs (comma separated list)
### Options
* name - Required: true
* uuids - Required: true
## robinhood.createWatchlist(opts)
Create a new watchlist
### Options
* name - Required: true
## robinhood.getDividends(opts)
Retrieve user dividend payouts
### Options
## robinhood.getDocuments(opts)
Retrieve user documents
### Options
## robinhood.getSP500Movers(opts)
Get S&P 500 movers
### Options
* direction - Required: true (Valid Values: up,down)
## robinhood.getCompaniesReportingEarningsWithin(opts)
Get companies reporting earnings within X days
### Options
* range - Required: true
## robinhood.getEarnings(opts)
Get earnings by stock symbol
### Options
* symbol - Required: true
## robinhood.getCards(opts)
Get cards (notification) stack
### Options
## robinhood.dismissCard(opts)
Dismiss a card by the notification ID
### Options
* id - Required: true
## robinhood.getSplits(opts)
Get stock splits by instrument
### Options
* instrument - Required: true
