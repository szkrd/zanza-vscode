module.exports = [
  {
    key: 'ctrl+c',
    mac: 'cmd+c',
    when: 'editorFocus',
    command: 'zanza.copyToBuffer',
    title: 'Copy to Buffer',
  },
  {
    key: 'ctrl+x',
    mac: 'cmd+x',
    when: 'editorFocus && !editorReadonly',
    command: 'zanza.cutToBuffer',
    title: 'Cut to Buffer',
  },
  {
    key: 'ctrl+shift+v 1',
    mac: 'cmd+shift+v 1',
    when: 'editorTextFocus && !editorReadonly',
    command: 'zanza.pasteFromBuffer1',
    title: 'Paste from Buffer [1]',
  },
  {
    key: 'ctrl+shift+v 2',
    mac: 'cmd+shift+v 2',
    when: 'editorTextFocus && !editorReadonly',
    command: 'zanza.pasteFromBuffer2',
    title: 'Paste from Buffer [2]',
  },
  {
    key: 'ctrl+shift+v 3',
    mac: 'cmd+shift+v 3',
    when: 'editorTextFocus && !editorReadonly',
    command: 'zanza.pasteFromBuffer3',
    title: 'Paste from Buffer [3]',
  },
  {
    key: 'ctrl+shift+v 4',
    mac: 'cmd+shift+v 4',
    when: 'editorTextFocus && !editorReadonly',
    command: 'zanza.pasteFromBuffer4',
    title: 'Paste from Buffer [4]',
  },
  {
    key: 'ctrl+shift+v 5',
    mac: 'cmd+shift+v 5',
    when: 'editorTextFocus && !editorReadonly',
    command: 'zanza.pasteFromBuffer5',
    title: 'Paste from Buffer [5]',
  },
  {
    key: 'ctrl+shift+v ctrl+shift+v',
    when: 'editorTextFocus && !editorReadonly',
    command: 'zanza.showClipboardBuffer',
    title: 'Show Clipboard Buffer',
  },
];
