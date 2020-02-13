const API_URL: string = "http://localhost:1337";

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
  let json = await response.json();
  if (response.ok) {
    return json;
  } else {
    const error = new Error(json.message);
    return error;
  }
}

export default listLogEntries;
