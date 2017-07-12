"use strict";

const enums = require('./enums');

class APIError extends Error{
   constructor(code, additionalInfo){
      if(code in enums === false){
         super(enums.E_UNKNOWN);
         this.code = 'E_UNKNOWN';

         return this;
      }

      let message = enums[code];

      if(typeof additionalInfo === 'string')
         message = message + ' | ' + additionalInfo;

      super(message);

      this.additionalInfo = additionalInfo;
      this.code = code;

      return this;
   }
}

module.exports = APIError;