import './main.css';

// replace addText/addSubText/addButtons/setButtons in consumers

export function createStatusbar(initialText, { buttons2 = [], hideTimeShort = 6000, hideTimeLong = 60000, css = {} } = {}) {
  let _lastText;
  let _lastSubtext = '';
  const _history = [];
  const _statusbar = create(buttons2, hideTimeShort, hideTimeLong);

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
    document.getElementById('hx-statusbar-left').innerText = fullText;
    if (className) {
      _statusbar.className = `hx-statusbar ${className}`;
    }
  }

  function addSubtext(text) {
    _lastSubtext = text;
    const fullText = _lastText + (text?.length ? ` (${text})` : '');
    document.getElementById('hx-statusbar-left').innerText = fullText;
  }

  function addHistory(text) {
    if (text) {
      _history.push({ text, date: new Date() });
    }
  }

  function addButton({ text, title, disabled, handler }) {
    document.getElementById('hx-statusbar-right').prepend(createButton({ text, title, disabled, handler }));
  }

  return {
    text: (str, className) => addText(str, className),
    subtext: (str) => addSubtext(str),
    info: (str) => addText(str, 'info'),
    ok: (str) => addText(str, 'ok'),
    warn: (str) => addText(str, 'warn'),
    error: (str) => addText(str, 'error'),
    button: addButton,
    buttons: (btns) => {
      if (btns?.length) {
        document.getElementById('hx-statusbar-right').replaceChildren(...btns);
      } else {
        document.getElementById('hx-statusbar-right').replaceChildren();
      }
    },
    buttons2: (btns) => {
      document.getElementById('hx-statusbar-right').replaceChildren();
      btns.forEach((btn) => addButton(btn));
    },
  };
}

export function foo() {
  return 'bar';
}

function addCss(css) {
  if (typeof css !== 'object') {
    return;
  }
  for (var prop in css) {
    if (Object.prototype.hasOwnProperty.call(css, prop)) {
      document.documentElement.style.setProperty(`--${prop}`, css[prop]);
    }
  }
}

function createButton({ text, title, disabled, handler }) {
  const btn = document.createElement('button');
  btn.innerText = text;
  btn.title = title;
  btn.disabled = !!disabled;
  if (typeof handler === 'function') {
    btn.addEventListener('click', handler);
  } else {
    btn.disabled = true;
  }
  return btn;
}

function create(buttons, hideTimeShort, hideTimeLong) {
  const statusbar = document.createElement('div');
  statusbar.id = 'hx-statusbar';
  statusbar.className = 'hx-statusbar';

  const leftContainer = document.createElement('div');
  leftContainer.id = 'hx-statusbar-left';

  const rightContainer = document.createElement('div');
  rightContainer.id = 'hx-statusbar-right';
  buttons.forEach((button) => {
    rightContainer.append(createButton(button));
  });

  statusbar.append(leftContainer);
  statusbar.append(rightContainer);

  leftContainer.addEventListener('click', (event) => {
    console.log('event', event);
    if (event.target.tagName === 'BUTTON') {
      // Let through clicks on buttons
      return;
    }
    const timeToHide = event.ctrlKey || event.shiftKey ? hideTimeLong : hideTimeShort;
    // Hide statusbar on clicks on non-buttons
    statusbar.classList.toggle('hidden');
    setTimeout(() => {
      statusbar.classList.toggle('hidden');
    }, timeToHide);
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
