"use strict";

const request = require('request-promise-native');
const _ = require('lodash');
const querystring = require('querystring');
const APIError = require('./api/error');
const calls = require('./api/calls');

class RobinHood{
   constructor(){
      let self = this;

      this.token = null;
      this.baseUrl = 'https://api.robinhood.com';

      _.each(calls, function(call, action){
         self.createCall(call, action);
      });
   }

   createCall(call, action){
      let self = this;

      self[action] = (async (opts) => {
         if(typeof opts === 'undefined' || opts === null)
            opts = {};

         try{
            _.each(call.fields, function(options, field){
               if('required' in options && options.required === true && field in opts === false)
                  throw new APIError('E_REQUIRED_FIELD', 'Field: ' + field);

               if('enum' in options && options.enum.indexOf(opts[field]) === -1)
                  throw new APIError('E_ENUM_FAILURE', 'Field: ' + field + ' Expects: ' + options.enum.join(','));

               if('transform' in options && typeof options.transform === 'function')
                  opts[field] = options.transform(opts[field]);

               if(call.path.includes('%' + field + '%')){
                  call.path = call.path.replace('%' + field + '%', opts[field]);
                  delete opts[field];
               }
            });

            let res = await self.request(call.method, call.path, opts);

            return res;
         }catch(e){
            throw e;
         }
      });
   }

   listCalls(){
      let details = [];

      _.each(calls, function(call, action){
         details.push({
            'Method' : 'robinhood.' + action + '(opts)',
            'Description' : call.description,
            'Options' : JSON.stringify(call.fields)
         })
      });

      details.push({
         'Method' : 'robinhood.getResource(url)',
         'Description' : 'Retrieve a URL from an API response such as an instrument or next page token.',
         'Options' : {}
      });

      return details;
   }

   async getResource(url){
      let self = this;

      try{
         return self.request('GET', url.replace(self.baseUrl, ''));
      }catch(e){
         throw e;
      }
   }

   async request(requestType, path, data){
      let self = this;
      let headers = {
         'X-Robinhood-API-Version': '1.0.0',
         'User-Agent': 'Robinhood/823 (iPhone; iOS 7.1.2; Scale/2.00)'
      };

      if(self.token !== null)
         headers = {
            'Authorization' : 'Token ' + self.token
         }

      try{
         let reqOpt = {
            url: self.baseUrl + path,
            method: requestType,
            json: true,
            headers: headers
         };

         if(requestType === 'POST')
            reqOpt.formData = data;

         if(requestType === 'GET' && typeof data === 'object' && Object.keys(data).length !== 0)
            reqOpt.url += '?' + querystring.stringify(data, '&', '=', {encodeURIComponent: function(item){return item;}});

         let result = await request(reqOpt);

         return self.parseResult(result);
      }catch(e){
         if('error' in e)
            throw new APIError('E_API_ERROR', e.error);

         throw e;
      }
   }

   parseResult(result){
      let self = this;

      if('token' in result)
         self.token = result.token;

      if('mfa_type' in result)
         throw new APIError('E_MFA');

      return result;
   }
}

module.exports = RobinHood;