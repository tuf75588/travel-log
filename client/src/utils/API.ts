const API_URL: string =
  window.location.hostname === "localhost"
    ? "http://localhost:1337"
    : "https://travel-logger-api.now.sh";

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}

export async function createLogEntry(entry: any) {
  const apiKey = entry.apiKey;
  // I don't want the apiKey being shown in the body of the request
  delete entry.apiKey;
  const response = await fetch(`${API_URL}/api/logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey
    },
    body: JSON.stringify(entry)
  });
  let json;
  if (response.headers.get("content-type")?.includes("text/html")) {
    const message = await response.text();
    json = {
      message
    };
  } else {
    json = await response.json();
  }
  if (response.ok) {
    return json;
  }
  const error: any = new Error(json.message);
  error.response = json;
  throw error;
}

export default listLogEntries;
