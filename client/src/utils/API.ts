const API_URL: string = "http://localhost:5000/api/logs";

async function listEntries() {
  try {
    const response = await fetch(API_URL);
    const entryData = await response.json();
    return entryData;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    console.log("finally!");
  }
}

export async function createLogEntry(entry: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(entry)
  });
  return response;
}

export default listEntries;
