// merges all the json-like js file in this directory
// and injects them into the main package.json
// (somewhat less painful than defining everything in the package.json itself)
// ---------------------------------------------------------------------------
const fs = require('fs');
const output = require('../package.json');
const partsNamed = {
  bookmark: require('./bookmark'),
  changeCase: require('./changeCase'),
  clipboardBuffer: require('./clipboardBuffer'),
  commentDown: require('./commentDown'),
  openSelection: require('./openSelection'),
  greedySelect: require('./greedySelect'),
  startBash: require('./startBash'),
  openFolderNewInstance: require('./openFolderNewInstance'),
  fromDiffToFile: require('./fromDiffToFile'),
  generic: require('./generic'),
  peafowlColor: require('./peafowlColor'),
  sortLines: require('./sortLines'),
  multipleCommands: require('./multipleCommands'),
};
const parts = Object.values(partsNamed);

const activationEvents = [
  // example:
  // "onCommand:zanza.foobar",
];
const keybindings = [
  // example:
  // {
  //   "key": "alt+backspace",
  //   "command": "editor.action.foobar",
  //   "when": "textInputFocus && !editorReadonly"
  // },
];
const commands = [
  // example:
  // {
  //   "command": "zanza.copyToBuffer",
  //   "title": "Copy to Buffer"
  // },
];
const menus = {
  // example:
  //   "explorer/context": [
  //     {
  //         "command": "extension.scopeToHere",
  //         "group": "navigation@98",
  //         "when": "explorerResourceIsFolder"
  //     }
  // ],
};

parts.flat().forEach((part) => {
  // activation event (deprecated)
  // with vscode 1.75+ these are automated on the ide level
  // `activationEvents.push(`onCommand:${part.command}`);`

  // keybinding
  if (part.key) {
    const keybinding = {
      command: part.command,
      key: part.key,
    };
    if (part.when) {
      keybinding.when = part.when;
    }
    if (part.mac) {
      keybinding.mac = part.mac;
    }
    keybindings.push(keybinding);
  }
  // command
  if (part.title) {
    commands.push({ command: part.command, title: part.title });
  }
  // menu
  if (part.menu) {
    const group = (menus[part.menu] = menus[part.menu] ?? []);
    group.push({ command: part.command, group: part.group, when: part.when });
  }
  // menu for the command palette
  if (part.skipCommandPalette) {
    const groupName = 'commandPalette';
    const group = (menus[groupName] = menus[groupName] ?? []);
    group.push({ command: part.command, when: 'never' });
  }
});

const save = (name = '') => fs.writeFileSync(name, JSON.stringify(output, null, 2));
save('package.json.old');
output.activationEvents = activationEvents;
output.contributes.keybindings = keybindings;
output.contributes.commands = commands;
output.contributes.menus = menus;
save('package.json');

// generate toc
let lines = ['# Commands'];
Object.keys(partsNamed).forEach((key) => {
  const commands = partsNamed[key];
  if (!commands.length) return;
  lines.push(`\n## ${key}\n`);
  commands.forEach((command) => {
    if (command.title && command.command) {
      lines.push(`- **${command.command}** = ${command.title}`);
    }
  });
});
lines.push(`\n\n(generated at ${new Date().toISOString().substring(0, 10)})\n`);
fs.writeFileSync('docs/commands.md', lines.join('\n'));
