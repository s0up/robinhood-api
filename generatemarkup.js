/*Generate documentation for github and modify the README.  Helps me stay lazy!*/

const calls = require('./api/calls');
const _ = require('lodash');
const fs = require('fs');

var markup = '';

_.each(calls, function(options, call){
   var hasOptions = ('fields' in options && Object.keys(options.fields.length > 0)) ? true : false;

   markup += '## robinhood.' + call + ((hasOptions) ? '(opts)' : '()') +  "\n";
   markup += options.description + "\n";

   if(hasOptions){
      markup += '### Options' + "\n";
      _.each(options.fields, function(fieldInfo, field){
         var isEnum = ('enum' in fieldInfo) ? true : false;

         markup += '* ' + field + ' - Required: ' + fieldInfo.required + ((isEnum) ? ' (Valid Values: ' + fieldInfo.enum.join(',') + ')' : '') + "\n";
      });
   }
});

let readme = fs.readFileSync('README.md').toString().split('# General API Calls');

readme = readme[0] + "# General API Calls \n" + markup;

fs.writeFileSync('README.md', readme);

console.log('Markup generated');