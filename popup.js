function formatMemory(mb) {
  if (mb < 1024) {
    return `${Math.round(mb)} MB`;
  }
  const gb = mb / 1024;
  const decimals = gb >= 10 ? 1 : 2;
  return `${gb.toFixed(decimals)} GB`;
}

async function updateRam() {
  try {
    const info = await chrome.system.memory.getInfo();
    
    const freeMB = info.availableCapacity / (1024 * 1024);
    const totalMB = info.capacity / (1024 * 1024);
    const percentFree = Math.round((info.availableCapacity / info.capacity) * 100);

    document.getElementById('ramValue').innerText = formatMemory(freeMB);
    document.getElementById('totalRam').innerText = `Total: ${formatMemory(totalMB)}`;
    document.getElementById('progressFill').style.width = `${percentFree}%`;
    
    const fill = document.getElementById('progressFill');
    const valueText = document.getElementById('ramValue');
    
    if (percentFree < 20) {
      fill.style.background = '#f44336';
      valueText.style.color = '#f44336';
    } else if (percentFree < 50) {
      fill.style.background = '#ff9800';
      valueText.style.color = '#ff9800';
    } else {
      fill.style.background = '#4CAF50';
      valueText.style.color = '#4CAF50';
    }
  } catch (error) {
    document.getElementById('ramValue').innerText = "API Error";
    console.error("RAM Light Error:", error);
  }
}

// Update immediately when popup opens
updateRam();

// Refresh every 2 seconds while popup is open
const intervalId = setInterval(updateRam, 2000);

// Clean up interval when popup closes
window.addEventListener('pagehide', () => clearInterval(intervalId));
