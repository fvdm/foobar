const dotest = require ('dotest');
const app = require ('./');

dotest.add ('foo()', test => {
  test()
    .isObject ('fail', 'module.exports', app)
    .done()
  ;
});

dotest.run ();
