const RobinHood = require('./index.js');

(async () => {
   try{
      let rh = new RobinHood();
      
      await rh.login({username: process.env.ROBINHOOD_USERNAME, password: process.env.ROBINHOOD_PASSWORD});

      let r = await rh.getQuote({symbol: 'MSFT'});
      console.log(r);

      console.log('We are logged in!');
   }catch(e){
      console.log('Error Code ' + e.code);
      console.log(e);
   }
})();
