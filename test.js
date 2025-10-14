const dotest = require ('dotest');
const app = require ('./');
const countLines = require ('./test1');

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


dotest.add ('test1 Interface', test => {
  test()
    .isFunction ('fail', 'countLines', countLines)
    .done()
  ;
});


dotest.add ('test1 countLines() default URL (no args)', async test => {
  const result = await countLines();

  test()
    .isNumber ('fail', 'return', result)
    .done()
  ;
});


dotest.add ('test1 countLines() default URL (null)', async test => {
  const result = await countLines(null);

  test()
    .isNumber ('fail', 'return', result)
    .done()
  ;
});


dotest.add ('test1 countLines() custom URL', async test => {
  const result = await countLines({ url: 'https://fvdm.com/robots.txt' });

  test()
    .isNumber ('fail', 'return', result)
    .done()
  ;
});


dotest.add ('test1 countLines() empty options', async test => {
  const result = await countLines({});

  test()
    .isNumber ('fail', 'return', result)
    .done()
  ;
});


dotest.add ('test1 countLines() error handling', async test => {
  let error;

  try {
    await countLines({ url: 'https://fvdm.com/nonexistent-page-404' });
  }
  catch (err) {
    error = err;
  }

  test()
    .isError ('fail', 'error', error)
    .done()
  ;
});


dotest.run ();
