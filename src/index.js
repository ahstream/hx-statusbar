import './main.css';

// replace addText/addSubText/addButtons/setButtons in consumers

export function createStatusbar(initialText, { buttons = [], hiddenTime = 3000, css = {} }) {
  let _lastText;
  let _lastSubtext = '';
  const _history = [];
  const _statusbar = create(buttons, hiddenTime);

  mount(_statusbar);
  addCss(css);
  addText(initialText);

  function addText(text, className = null) {
    _lastText = text;
    addHistory(text);
    _statusbar.title = _history
      .map((x) => `${x.text} [${x.date.toLocaleTimeString()}]`)
      .reverse()
      .join('\n');
    const fullText = text + (_lastSubtext?.length ? ` (${_lastSubtext})` : '');
    document.getElementById('hx-statusbar-text').innerText = fullText;
    if (className) {
      _statusbar.className = `hx-statusbar ${className}`;
    }
  }

  function addSubtext(text) {
    _lastSubtext = text;
    const fullText = _lastText + (text?.length ? ` (${text})` : '');
    document.getElementById('hx-statusbar-text').innerText = fullText;
  }

  function addHistory(text) {
    if (text) {
      _history.push({ text, date: new Date() });
    }
  }

  return {
    text: (str, className) => addText(str, className),
    subtext: (str) => addSubtext(str),
    info: (str) => addText(str, 'info'),
    ok: (str) => addText(str, 'ok'),
    warn: (str) => addText(str, 'warn'),
    error: (str) => addText(str, 'error'),
    buttons: (btns) => {
      document.getElementById('statusbar-right').replaceChildren(...btns);
    },
  };
}

function addCss(css) {
  if (typeof css !== 'object') {
    return;
  }
  for (var prop in css) {
    if (Object.prototype.hasOwnProperty.call(css, prop)) {
      console.log(`Set: --${prop}: ${css[prop]}`);
      document.documentElement.style.setProperty(`--${prop}`, css[prop]);
    }
  }
}

function create(buttons, hiddenTime) {
  const statusbar = document.createElement('div');
  statusbar.id = 'hx-statusbar';
  statusbar.className = 'hx-statusbar';

  const leftContainer = document.createElement('div');
  leftContainer.className = 'left';

  const leftTextContainer = document.createElement('span');
  leftTextContainer.id = 'hx-statusbar-text';
  leftContainer.append(leftTextContainer);

  const rightContainer = document.createElement('div');
  rightContainer.className = 'right';
  buttons.forEach((button) => {
    rightContainer.append(button);
  });

  statusbar.append(leftContainer);
  statusbar.append(rightContainer);

  statusbar.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      // Let through clicks on buttons
      return;
    }
    // Hide statusbar on clicks on non-buttons
    statusbar.classList.toggle('hidden');
    setTimeout(() => {
      statusbar.classList.toggle('hidden');
    }, hiddenTime);
  });

  return statusbar;
}

function mount(statusbar) {
  // Make sure only one statusbar is present!
  const oldStatusbar = document.querySelector('[id="hx-statusbar"]');
  if (oldStatusbar) {
    oldStatusbar.replaceWith(statusbar);
  } else {
    document.body.append(statusbar);
  }
}
