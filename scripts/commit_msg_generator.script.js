const Clipboard = require('@book-junction/clipboard/build').default;

const clipboard = new Clipboard();

async function write(text) {
  await clipboard.copy(text);
  console.log(text);
}

const typePlaceHolder = process.argv[2];
const messagePlaceHolder = process.argv[4];
const descriptionPlaceHolder = process.argv[6];
const typeRegex = /(feat|fix|refac|hotfix|refactor|feat\/fix|fix\/feat)/;

const type = process.argv[3];
const message = process.argv[5];
const description = process.argv[7];
const date = new Date().toLocaleDateString('hi-In');

if (typePlaceHolder !== '--type' || messagePlaceHolder !== '--msg' || descriptionPlaceHolder !== '--desc') {
  console.error('Please provide --type, --msg and --desc arguments');
  process.exit(1);
}
if (!typeRegex.test(type)) {
  console.error('Invalid commit message type');
  process.exit(1);
}

const commitMessage = `git commit -m "${date} - ${type}: ${message}" -m "${description}"`;
write(commitMessage);
