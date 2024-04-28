const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const log = require('../log');

module.exports = function({ api }) {
  const usersDataPath = path.join(__dirname, 'json', 'usersData.json');
  let usersData;

  try {
    usersData = fs.readJSONSync(usersDataPath);
  } catch (error) {
    log.error(error);
    usersData = {};
  }

  async function getInfo(uid) {
    try {
      const userInfo = await api.getUserInfo(uid);
      return userInfo[uid];
    } catch (error) {
      log.error(error);
      return null;
    }
  }

  async function createData(uid) {
    try {
      const userInfo = await getInfo(uid);
      const data = {
        [uid]: {
          userID: uid,
          name: userInfo.name,
          vanity: _.get(userInfo, 'vanity', uid),
          gender: userInfo.gender,
          money: 0,
          createTime: { timestamp: Date.now() },
          data: { timestamp: Date.now() },
          lastUpdate: Date.now()
        }
      };

      _.merge(usersData, data);
      fs.writeJSONSync(usersDataPath, usersData, { spaces: 2 });
    } catch (error) {
      log.error(error);
    }
  }

  function getAllUsers() {
    return usersData;
  }

  function get(uid) {
    return _.get(usersData, uid, null);
  }

  function deleteData(uid) {
    if (_.has(usersData, uid)) {
      delete usersData[uid];
      fs.writeJSONSync(usersDataPath, usersData, { spaces: 2 });
      return true;
    } else {
      return false;
    }
  }

  function setData(uid, dataKey, value) {
    if (_.has(usersData, uid)) {
      _.set(usersData, `${uid}.${dataKey}`, value);
      fs.writeJSONSync(usersDataPath, usersData, { spaces: 2 });
      return true;
    } else {
      return false;
    }
  }

  return {
    createData: createData,
    getAllUsers: getAllUsers,
    get: get,
    deleteData: deleteData,
    setData: setData
  };
};