module.exports = {
   'login': {
      description: 'Login to RobinHood with your user credentials.',
      path: '/api-token-auth/',
      fields: {
         username: {
            required: true
         },
         password: {
            required: true
         }
      },
      method: 'POST'
   },
   'mfaCode': {
      description: 'Login using a two-step authentication code.',
      path: '/api-token-auth/',
      fields: {
         username: {
            required: true
         },
         password: {
            required: true
         },
         mfa_code: {
            required: true
         }
      },
      method: 'POST'
   },
   'getUserData': {
      description: 'Get the user\'s basic account information.',
      path: '/user/',
      fields: {},
      method: 'GET'
   },
   'getUserInvestmentProfile' : {
      description: 'Get the user\'s investment profile.',
      path: '/user/investment_profile/',
      fields: {},
      method: 'GET'
   },
   getPositions: {
      description: 'Get the current stock positions being held.',
      path: '/positions/',
      fields: {},
      method: 'GET'
   },
   'getRecentOrders': {
      description: 'Get recently placed orders.',
      path: '/orders/',
      fields: {
         updated_at: {
            required: false
         },
         instrument: {
            required: false
         },
         cursor: {
            required: false
         }
      },
      method: 'GET'
   },
   'getInstruments': {
      description: 'Get instruments list.',
      path: '/instruments/',
      fields: {},
      method: 'GET'
   }
};