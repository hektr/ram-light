function formatMemory(mb) {
  if (mb < 1024) {
    return `${Math.round(mb)} MB`;
  }
  const gb = mb / 1024;
  const decimals = gb >= 10 ? 1 : 2;
  return `${gb.toFixed(decimals)} GB`;
}

chrome.runtime.sendMessage({ action: 'updateBadge' });

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
      fill.style.background = 'var(--critical)';
      valueText.style.color = 'var(--critical)';
    } else if (percentFree < 50) {
      fill.style.background = 'var(--warning)';
      valueText.style.color = 'var(--warning)';
    } else {
      fill.style.background = 'var(--good)';
      valueText.style.color = 'var(--good)';
    }
  } catch (error) {
    document.getElementById('ramValue').innerText = "API Error";
    console.error("RAM Light Error:", error);
  }
}

// --- Tab discarding logic ---
document.getElementById('freeRamBtn').addEventListener('click', async () => {
  const btn = document.getElementById('freeRamBtn');
  const status = document.getElementById('actionStatus');

  btn.disabled = true;
  btn.innerText = "Processing...";
  status.innerText = "";

  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    let discardedCount = 0;

    for (const tab of tabs) {
      if (tab.active || tab.pinned || tab.discarded) continue;
      if (tab.url && (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://'))) continue;

      try {
        await chrome.tabs.discard(tab.id);
        discardedCount++;
      } catch (err) {
        console.warn(`Could not discard tab ${tab.id}:`, err);
      }
    }

    status.innerText = discardedCount > 0
      ? `Freed ${discardedCount} tab${discardedCount > 1 ? 's' : ''}`
      : "No inactive tabs to discard";
    status.style.color = discardedCount > 0 ? 'var(--good)' : 'var(--text-secondary)';

    // Refresh RAM stats after cleanup
    setTimeout(updateRam, 600);

  } catch (error) {
    console.error("Discard error:", error);
    status.innerText = "Error occurred";
    status.style.color = 'var(--critical)';
  }

  // Reset button state
  setTimeout(() => {
    btn.disabled = false;
    btn.innerText = "Discard inactive tabs";
  }, 3000);
});

// --- RAM monitoring ---
updateRam();
const intervalId = setInterval(updateRam, 2000);
