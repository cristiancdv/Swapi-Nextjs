export async function fetchEntity<T>(url: string): Promise<T> {
    const res = await fetch(url);
    console.log(res);
  
    if (!res.ok) {
      throw new Error(`Error fetching ${url}: ${res.statusText}`);
    }
    const data = await res.json();
    return data as T;
  }