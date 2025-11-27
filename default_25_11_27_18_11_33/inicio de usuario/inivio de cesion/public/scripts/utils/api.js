export async function apiPost(endpoint, payload) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw {
        status: response.status,
        body: data
      };
    }
    return data;
  } catch (error) {
    if (error.status) {
      throw error.body;
    }
    throw {
      error: "Network error",
      details: error.message
    };
  }
}
