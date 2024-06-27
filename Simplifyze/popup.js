// Initialize the toggle switch state
chrome.storage.local.get(['simplificationEnabled'], (result) => {
    document.getElementById('toggle-switch').checked = result.simplificationEnabled || false;
  });
  
  // Add an event listener to the toggle switch
  document.getElementById('toggle-switch').addEventListener('change', (event) => {
    const isEnabled = event.target.checked;
    chrome.storage.local.set({ simplificationEnabled: isEnabled }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      });
    });
  });