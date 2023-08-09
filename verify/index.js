import { createStatusbar } from '../dist/index';

import '../dist/main.css';

const statusbar = createStatusbar('Statusbar Template Text', {
  css: {
    'default-background-color': 'black',
  },
  buttons: createButtons(),
});

setTimeout(() => statusbar.text('Text'), 1000);
setTimeout(() => statusbar.info('Info'), 2000);
setTimeout(() => statusbar.warn('Warn'), 3000);
setTimeout(() => statusbar.error('Error'), 4000);
setTimeout(() => statusbar.ok('Ok'), 5000);
setTimeout(() => statusbar.subtext('Subtext'), 6000);

function createButtons() {
  const buttons = [];

  const add = (text, title, handler) => {
    const btn = document.createElement('button');
    btn.innerText = text;
    btn.title = title;
    if (typeof handler === 'function') {
      btn.addEventListener('click', handler);
    } else {
      btn.disabled = true;
    }
    buttons.push(btn);
  };

  add('Button 1', 'This is button 1', () => alert('Button 1 clicked'));
  add('Button 2', 'This is button 2', () => alert('Button 2 clicked'));

  return buttons.reverse();
}
