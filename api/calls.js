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
  'getACHRelationships': {
    description: 'Get the ACH methods associated with this account.',
    path: '/ach/relationships/',
    fields: {},
    method: 'GET'
  },
  'getACHRelationship': {
    description: 'Get an ACH relationship by ID (retrieved by getACHRelationships())',
    path: '/ach/relationships/%relationship_id%/',
    fields: {
      relationship_id: {
        required: true
      }
    },
    method: 'GET'
  },
  'automaticACHTransfer': {
    description: 'Add a scheduled ACH transfer to fund this account.',
    path: '/ach/deposit_schedules/',
    fields: {
      ach_relationship: {
        required: true /*ACH relationship URL from getACHRelationship() call*/
      },
      amount: {
        required: true
      },
      frequency: {
        required: false,
        enum: ['weekly', 'biweekly', 'monthly', 'quarterly']
      }
    },
    method: 'POST'
  },
  'getAutomaticACHTransfer': {
    description: 'Get scheduled ACH transfers.',
    path: '/ach/deposit_schedules/',
    fields: {},
    method: 'GET'
  },
  'ACHTransfer': {
    description: 'Perform a one time ACH transfer to or from your bank account.',
    path: '/ach/transfers/',
    fields: {
      amount: {
        required: true
      },
      ach_relationship: {
        required: true
      },
      direction: {
        required: true,
        enum: ['withdraw', 'deposit']
      }
    },
    method: 'POST'
  },
  'getACHTransfer': {
    description: 'Get list of one time ACH transfers to or from your bank account.',
    path: '/ach/transfers/',
    fields: {},
    method: 'GET'
  },
  'getUserData': {
    description: 'Get the user\'s basic account information.',
    path: '/user/',
    fields: {},
    method: 'GET'
  },
  'getAccounts': {
    description: 'Get the accounts associated with the user credentials.',
    path: '/accounts/',
    fields: {},
    method: 'GET'
  },
  'getUserInvestmentProfile': {
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
        enum: [true, false],
        transform: function(i){
          return (i == true) ? "true" : "false"
        }
      }
    },
    method: 'GET'
  },
  getPortfolio: {
    description: 'Get the user\'s portfolio by account ID',
    path: '/portfolios/%account_number%',
    fields: {
      account_number: {
        required: true
      }
    },
    method: 'GET'
  },
  getHistoricals: {
    description: 'Get the user\'s portfolio historicals',
    path: '/portfolios/historicals/%account_number%/',
    fields: {
      account_number: {
        required: true
      },
      interval: {
        required: false,
        enum: ['', 'week', 'day', '10minute', '5minute']
      },
      span: {
        required: false,
        enum: ['', 'day', 'week', 'year', '5year', 'all']
      },
      bounds: {
        required: false
      }
    },
    method: 'GET'
  },
  getTickerHistoricals: {
    description: 'Get historicals for a particular symbol',
    path: '/quotes/historicals/%symbol%/',
    fields: {
      symbol: {
        required: true,
        transform(i){
          return i.toUpperCase();
        }
      },
      interval: {
        required: false,
        enum: ['', 'week', 'day', '10minute', '5minute']
      },
      span: {
        required: false,
        enum: ['', 'day', 'week', 'year', '5year', 'all']
      },
      bounds: {
        required: false
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
  'placeOrder': {
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
        required: false,
        /*Only required when type equals limit*/
      },
      stop_price: {
        required: false,
        /*Only required when trigger equals stop*/
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
        enum: [true, false],
        transform: function(i){
          return (i == true) ? "true" : "false"
        }
      },
      override_day_trade_checks: {
        required: false,
        enum: [true, false],
        transform: function(i){
          return (i == true) ? "true" : "false"
        }
      },
      override_dtbp_checks: {
        required: false,
        enum: [true, false],
        transform: function(i){
          return (i == true) ? "true" : "false"
        }
      }
    },
    method: 'POST'
  },
  'cancelOrder': {
    description: 'Cancel an active order',
    path: '/orders/%order_id%/cancel/',
    fields: {
      order_id: {
        required: true
      }
    },
    method: 'POST'
  },
  'getInstruments': {
    description: 'Get instruments list.',
    path: '/instruments/',
    fields: {
      query: {
        required: false
      }
    },
    method: 'GET'
  },
  'getQuotes': {
    description: 'Get quote on a security via ticker symbols (comma separated list)',
    path: '/quotes/',
    fields: {
      symbols: {
        required: true,
        transform: function(i) {
          return i.toUpperCase();
        }
      }
    },
    method: 'GET'
  },
  'getQuote': {
    description: 'Get quote on a single security via ticker symbol',
    path: '/quotes/%symbol%/',
    fields: {
      symbol: {
        required: true,
        transform: function(i) {
          return i.toUpperCase();
        }
      }
    },
    method: 'GET'
  },
  'getMarkets': {
    description: 'Get market data for the different exchanges',
    path: '/markets/',
    fields: {},
    method: 'GET'
  },
  'getFundamentals': {
    description: 'Get fundamental data for ticker symbols (comma separated list)',
    path: '/fundamentals/',
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
  'getWatchlists': {
    description: 'Get list of watchlists for a user',
    path: '/watchlists/',
    fields: {},
    method: 'GET'
  },
  'reorderWatchlist': {
    description: 'Reorder a watchlist.  UUIDs is a list of instrument URLs (comma separated list)',
    path: '/watchlists/%name%/reorder/',
    fields: {
      name: {
        required: true
      },
      uuids: {
        required: true
      }
    },
    method: 'POST'
  },
  'createWatchlist': {
    description: 'Create a new watchlist',
    path: '/watchlists/',
    fields: {
      name: {
        required: true
      }
    },
    method: 'POST'
  },
  'getDividends': {
    description: 'Retrieve user dividend payouts',
    path: '/dividends/',
    fields: {},
    method: 'GET'
  },
  'getDocuments': {
    description: 'Retrieve user documents',
    path: '/documents/',
    fields: {},
    method: 'GET'
  },
  'getSP500Movers': {
    description: 'Get S&P 500 movers',
    path: '/midlands/movers/sp500/',
    fields: {
      direction: {
        enum: ['up', 'down'],
        required: true
      }
    },
    method: 'GET'
  },
  'getCompaniesReportingEarningsWithin': {
    description: 'Get companies reporting earnings within X days',
    path: '/marketdata/earnings/',
    fields: {
      range: {
        required: true,
        transform: function(i){
          return i + 'day';
        }
      }
    },
    method: 'GET'
  },
  'getEarnings': {
    description: 'Get earnings by stock symbol',
    path: '/marketdata/earnings/',
    fields: {
      symbol: {
        required: true,
        transform: function(i){
          return i.toUpperCase();
        }
      }
    },
    method: 'GET'
  },
  'getCards': {
    description: 'Get cards (notification) stack',
    path: '/midlands/notifications/stack/',
    fields: {},
    method: 'GET'
  },
  'dismissCard': {
    description: 'Dismiss a card by the notification ID',
    path: '/midlands/notifications/stack/%id%/dismiss/',
    fields: {
      id: {
        required: true
      }
    },
    method: 'POST'
  },
  'getSplits': {
    description: 'Get stock splits by instrument',
    path: '/instruments/%instrument%/splits/',
    fields: {
      instrument: {
        required: true
      }
    },
    method: 'GET'
  }
};
