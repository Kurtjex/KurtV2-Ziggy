const _ = require('lodash');

module.exports = async function({
  event, Users, Threads
}) {
  try {
    const {
      allUsers, allThreads
    } = global.data;
    const {
      database
    } = global.client.config;
    let {
      senderID, threadID
    } = event;
    senderID = String(senderID);
    threadID = String(threadID);

    if (database === true) {
      if (!_.includes(allUsers, senderID)) {
        await Users.createData(senderID);
      } else if (!_.includes(allThreads, threadID)) {
        await Threads.createData(threadID);
      }
    } else {
      return null;
    }
  } catch (error) {
    log.error(error);
  }
};