
export async function fetchPostJson(url: string, data: any) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  
    return response.json();
  }
  