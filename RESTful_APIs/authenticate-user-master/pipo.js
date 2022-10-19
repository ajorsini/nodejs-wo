const jwt = require('jsonwebtoken');

console.log(typeof jwt, '\n---------------');
console.log(jwt);

const tk = jwt.sign({ role: 'user', name: 'Ale', email: 'ale@git.com' }, 'myPass', { expiresIn: '1h' } );

console.log(tk);
