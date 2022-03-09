const EMAIL_API_KEY = process.env.REACT_APP_WEATHER_EMAIL_API_KEY || process.env.REACT_APP_EMAIL_API_KEY
var SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = EMAIL_API_KEY

new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
  {
    'subject':'Hello from the Node SDK!',
    'sender' : {'email':'edgeorge101@gmail.com', 'name':'Ed'},
    'replyTo' : {'email':'edgeorge101@gmail.com', 'name':'Ed'},
    'to' : [{'name': 'James', 'email':'steadyede@live.co.uk'}],
    'htmlContent' : '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>',
    'params' : {'bodyMessage':'Made just for you!'}
  }
).then(function(data) {
  console.log(data);
}, function(error) {
  console.error(error);
});

