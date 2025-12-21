// SMS Permission Handler for Android
const btn = document.getElementById("requestSmsBtn");
const toggle = document.getElementById("smsToggle");

// Load saved state from localStorage
if (toggle) {
  toggle.checked = localStorage.getItem("smsEnabled") === "true";
}

// Request SMS permissions (Android only)
// Request SMS permissions (Android only)
btn?.addEventListener("click", async () => {
  // Check if running in Capacitor (Android app)
  if (!window.Capacitor) {
    alert("SMS tracking works only in the Android app. On web, use the SMS Simulator on the Home page for testing.");
    return;
  }

  const permissions = window.cordova?.plugins?.permissions;
  if (!permissions) {
    console.error("Cordova Permissions plugin not found");
    alert("Permission plugin missing. Please rebuild app.");
    return;
  }

  const list = [
    permissions.RECEIVE_SMS,
    permissions.READ_SMS
  ];

  permissions.checkPermission(list, (status) => {
    if (status.hasPermission) {
      enableSms();
    } else {
      permissions.requestPermissions(list, (status) => {
        if (status.hasPermission) {
          enableSms();
        } else {
          alert("❌ SMS permissions denied. Please enable them in Settings.");
        }
      }, () => {
        alert("Failed to request permissions.");
      });
    }
  }, null);

  function enableSms() {
    localStorage.setItem("smsEnabled", "true");
    if (toggle) toggle.checked = true;
    alert("✅ SMS tracking enabled! Transactions will be added automatically.");
  }
});

// Toggle SMS tracking on/off
toggle?.addEventListener("change", () => {
  const enabled = toggle.checked;
  localStorage.setItem("smsEnabled", enabled.toString());
  
  if (enabled) {
    console.log("SMS tracking enabled");
  } else {
    console.log("SMS tracking disabled");
  }
});
