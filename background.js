// Short formatting for badge (max 4 characters)
function formatMemoryBadge(mb) {
  if (mb < 1000) {
    // Up to 999 MB - show whole number
    return `${Math.round(mb)}M`;
  }
  const gb = mb / 1024;
  if (gb < 10) {
    // From 1 to 9.9 GB - keep one decimal place
    return `${gb.toFixed(1)}G`;
  }
  // 10 GB and above - round to whole number
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
      bgColor = '#f44336';
    } else if (percentFree < 50) {
      bgColor = '#ff9800';
    } else {
      bgColor = '#4CAF50';
    }
    await chrome.action.setBadgeBackgroundColor({ color: bgColor });
    
  } catch (error) {
    console.error("Badge update error:", error);
    await chrome.action.setBadgeText({ text: "ERR" });
    await chrome.action.setBadgeBackgroundColor({ color: '#9e9e9e' });
  }
}

updateBadge();
setInterval(updateBadge, 5000);
