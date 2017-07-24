const RobinHood = require('./index.js');

(async () => {
   try{
      let rh = new RobinHood();
      
      await rh.login({username: process.env.ROBINHOOD_USERNAME, password: process.env.ROBINHOOD_PASSWORD});

      //let test = await rh.getAccounts();
      test = await rh.getUserData();
      console.log(test);
      test = await rh.getAccounts();
      console.log(test);
      console.log('Logged in!');
   }catch(e){
      console.log('Error Code ' + e.code);
      console.log(e);
   }
})();
