(function (global) {
  const App = global.TimetableApp = global.TimetableApp || {};

  function exportJson(state) {
    const payload = {
      exportedAt: new Date().toISOString(),
      app: "local-timetable-prototype",
      version: 1,
      state
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `timetable-${dateStamp()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function importJson(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          resolve(App.State.normalizeState(parsed.state || parsed));
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  function saveLocal(state) {
    try {
      localStorage.setItem("local-timetable-prototype", JSON.stringify(state));
    } catch (error) {
      // localStorage may be unavailable when opened in some restricted contexts.
    }
  }

  function loadLocal() {
    try {
      const raw = localStorage.getItem("local-timetable-prototype");
      return raw ? App.State.normalizeState(JSON.parse(raw)) : null;
    } catch (error) {
      return null;
    }
  }

  function dateStamp() {
    const now = new Date();
    const pad = (value) => String(value).padStart(2, "0");
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
  }

  App.ImportExport = {
    exportJson,
    importJson,
    saveLocal,
    loadLocal
  };
})(globalThis);
