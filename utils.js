const fs = require('fs-extra');
const log = require('./includes/log');
const path = require('path');

async function loadAll() {
  const commandsPath = path.join(__dirname, 'modules', 'commands');
  const eventsPath = path.join(__dirname, 'modules', 'events');

  try {
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith('.js'));

    commandFiles.forEach((file) => {
      try {
        const cmdFile = require(path.join(commandsPath, file));

        if (!cmdFile) {
          log.error(`Error: ${file} does not export anything!`);
        } else if (!cmdFile.config) {
          log.error(`Error: ${file} does not export config!`);
        } else if (!cmdFile.onRun) {
          log.error(`Error: ${file} does not export onRun!`);
        } else {
          global.client.commands.set(cmdFile.config.name, cmdFile);
        }
      } catch (error) {
        log.error(`Error loading command ${file}: ${error.message}`);
      }
    });

    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith('.js'));

    eventFiles.forEach((file) => {
      try {
        const evntFile = require(path.join(eventsPath, file));

        if (!evntFile) {
          log.error(`Error: ${file} does not export anything!`);
        } else if (!evntFile.config) {
          log.error(`Error: ${file} does not export config!`);
        } else if (!evntFile.onEvent) {
          log.error(`Error: ${file} does not export onEvent!`);
        } else {
          global.client.events.set(evntFile.config.name, evntFile);
        }
      } catch (error) {
        log.error(`Error loading event ${file}: ${error.message}`);
      }
    });
  } catch (error) {
    log.error(error.stack);
  }
}

module.exports = { loadAll };