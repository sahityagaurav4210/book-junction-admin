import clipboard from 'clipboardy';

const type = process.argv[3];
const date = new Date().toLocaleDateString('hi-In');
let message = '';

for (let i = 5; i < process.argv.length; i++) message += process.argv[i] + ' ';

message = `${date} - ${type}: ${message}`;
clipboard.writeSync(message);
console.log(message);
