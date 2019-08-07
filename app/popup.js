let tabId = -1;
let currentUrl = '';
const SWITCHXCI = 'switch-xci.com';
let currentWeb = '';

// Get the current URL.
// @param {function(string)} callback - called when the URL of the current tab is found
function getCurrentTabUrl(callback) {
  // query information for the current tab
  var queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least one tab
    var tab = tabs[0];
    // A tab is a plain object that provides information about the tab.
    var url = tab.url;
    tabId = tab.id;
    currentUrl = url;
    callback(url, tab.id);
  });
}

// fires when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url, tabId) {
    printText(url);
    mainTask();
  });
});

function mainTask() {
  // Check Niceoppai Web
  if (isFoundWeb(currentUrl, SWITCHXCI)) {
    printText('found switchXCI');
    printText('No Banner Yo')
  } else {
    printText('not found match');
  }
}

function printText(input) {
  document.getElementById('showText').textContent = input;
}

function isFoundWeb(input, expect) {
  return input.indexOf(expect) !== -1;
}

function searchElementByTagText(tag, searchText) {
  return [...document.getElementsByTagName('a')].filter(function(data) {
    return data.textContent.indexOf(searchText) !== -1;
  });
}
