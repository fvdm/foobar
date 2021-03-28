const dotest = require ('dotest');
const app = require ('./');

dotest.add ('Interface', test => {
  test()
    .isObject ('fail', 'module.exports', app)
    .isFunction ('fail', '.foo()', app && app.foo)
    .done()
  ;
});


dotest.add ('Method foo()', test => {
  const result = app.foo();

  test()
    .isExactly ('fail', 'return', result, 'bar')
    .done ()
  ;
});


dotest.run ();
