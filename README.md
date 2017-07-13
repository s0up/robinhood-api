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
    let loginResult = await robinhood.login('email@test.com', 'mycoolpassword');

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
## robinhood.achTransfer(opts)
Perform an ACH transfer to fund this account.
### Options
* ach_relationship - Required: true
* amount - Required: true
* frequency - Required: false (Valid Values: weekly,biweekly,monthly,quarterly)
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
## robinhood.getInstruments(opts)
Get instruments list.
### Options
## robinhood.getQuotes(opts)
Get quote on a security via ticker symbols (comma separated list)
### Options
* symbols - Required: true
## robinhood.getQuote(opts)
Get quote on a single security via ticket symbol
### Options
* symbol - Required: true
