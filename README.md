Example Usage: 

```javascript
const RobinHood = require('robinhood-api');
const robinhood = new RobinHood();

(async () => {
  //Print the available API calls
  console.log(robinhood.listCalls());
  
  try{
    let loginResult = await robinhood.login('email@test.com', 'mycoolpassword');
    
    //Okay we're logged in!
    let myUserData = await robinhood.getUserData();
    console.log(myUserData);
  }catch(e){
    console.log('Oh noes!', e);
  }
})();
```


