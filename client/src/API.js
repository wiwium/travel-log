const API_URL = 'http://localhost:7000';

export async function listLogEntries(){
  const responce = await fetch(`${API_URL}/api/logs`);
  const json = await responce.json();
  return json;
}