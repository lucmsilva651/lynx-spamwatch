const fs = require('fs');
const path = require('path');

const blocklistPath = path.join(__dirname, '../../props/sw_blocklist.txt');

let blocklist = [];

const readBlocklist = () => {
  try {
    const data = fs.readFileSync(blocklistPath, 'utf8');
    blocklist = data.split('\n').map(id => id.trim()).filter(id => id !== '');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('WARN: SpamWatch blocklist file not found. Creating a new (blank) one.\nUse your API key to push the blocklist to the file.');
      fs.writeFileSync(blocklistPath, '');
    } else {
      console.error('WARN: Error reading SpamWatch blocklist:', error);
    }
  }
};

const isOnSpamWatch = (userId) => {
  return blocklist.includes(String(userId));
};

readBlocklist();

module.exports = { isOnSpamWatch };