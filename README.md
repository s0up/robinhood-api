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