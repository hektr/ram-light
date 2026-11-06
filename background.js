// Short formatting for badge (max 4 characters)
function formatMemoryBadge(mb) {
  if (mb < 1000) {
    return `${Math.round(mb)}M`;
  }
  const gb = mb / 1024;
  if (gb < 10) {
    return `${gb.toFixed(1)}G`;
  }
  return `${Math.round(gb)}G`;
}

async function updateBadge() {
  try {
    const info = await chrome.system.memory.getInfo();
    const freeMB = info.availableCapacity / (1024 * 1024);
    const percentFree = Math.round((info.availableCapacity / info.capacity) * 100);
    
    await chrome.action.setBadgeText({ text: formatMemoryBadge(freeMB) });
    
    let bgColor;
    if (percentFree < 20) {
      bgColor = '#ef4444'; // Rose/Red
    } else if (percentFree < 50) {
      bgColor = '#f59e0b'; // Amber/Orange
    } else {
      bgColor = '#10b981'; // Emerald/Green
    }
    await chrome.action.setBadgeBackgroundColor({ color: bgColor });
    
  } catch (error) {
    console.error("Badge update error:", error);
    await chrome.action.setBadgeText({ text: "ERR" });
    await chrome.action.setBadgeBackgroundColor({ color: '#9ca3af' });
  }
}

// Initialize badge on startup/install
chrome.runtime.onStartup.addListener(updateBadge);
chrome.runtime.onInstalled.addListener(updateBadge);

// Create an alarm to update the badge every 1 minute (minimum allowed by Chrome)
// This is much more battery-friendly and reliable than setInterval in a Service Worker.
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('updateBadgeAlarm', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'updateBadgeAlarm') {
    updateBadge();
  }
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateBadge') {
    updateBadge();
    sendResponse({ status: 'ok' });
  }
});

// Also update immediately when the service worker wakes up (e.g., user clicks the icon)
updateBadge();
