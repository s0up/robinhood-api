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
      fields: {
         nonzero: {
            required: false,
            enum: [true, false]
         }
      },
      method: 'GET'
   },
   'getOrder': {
      description: 'Get an order via the order_id parameter.',
      path: '/orders/%order_id%/',
      fields: {
         order_id: {
            required: true
         }
      },
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
   'placeOrder' : {
      description: 'Buy or sell a security.',
      path: '/orders/',
      fields: {
         account: {
            required: true
         },
         instrument: {
            required: true
         },
         symbol: {
            required: true
         },
         type: {
            required: true,
            enum: ['market', 'limit']
         },
         time_in_force: {
            required: true,
            enum: ['gfd', 'gtc', 'ioc', 'fok', 'opg'],
         },
         trigger: {
            required: true,
            enum: ['immediate', 'stop']
         },
         price: {
            required: false, /*Only required when type equals limit*/
         },
         stop_price: {
            required: false, /*Only required when trigger equals stop*/
         },
         quantity: {
            required: true
         },
         side: {
            required: true,
            enum: ['buy', 'sell']
         },
         extended_hours: {
            required: false,
            enum: [true, false]
         },
         override_day_trade_checks: {
            required: false,
            enum: [true, false]
         },
         override_dtbp_checks: {
            required: false,
            enum: [true, false]
         }
      }
   },
   'getInstruments': {
      description: 'Get instruments list.',
      path: '/instruments/',
      fields: {},
      method: 'GET'
   },
   'getQuotes': {
      description: 'Get quote on a security via ticker symbols (comma separated list)',
      path: '/quotes/',
      fields: {
         symbols: {
            required: true,
            transform: function(i){
               return i.toUpperCase();
            }
         }
      },
      method: 'GET'
   },
   'getQuote': {
      description: 'Get quote on a single security via ticket symbol',
      path: '/quotes/%symbol%/',
      fields: {
         symbol: {
            required: true,
            transform: function(i){
               return i.toUpperCase();
            }
         }
      },
      method: 'GET'
   }
};