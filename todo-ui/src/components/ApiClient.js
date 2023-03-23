const BASE_URL = "http://localhost:5000";

class ApiClient {

  get = async (path) => {
    const response = await fetch(`${BASE_URL}/${path}`);
    return this._getJsonFromResponse(response);
  }

  post = async(path, payload) => {
    var response = await fetch(`${BASE_URL}/${path}`, { 
      method: 'POST', 
      headers: { "Content-Type": 'application/json' }, 
      body: JSON.stringify(payload)
    });
    return this._getJsonFromResponse(response);
  }

  patch = async(path, id, payload) => {
    var response = await fetch(`${BASE_URL}/${path}/${id}`, { 
      method: 'PATCH', 
      headers: { "Content-Type": 'application/json' }, 
      body: JSON.stringify(payload)
    });
    return this._getJsonFromResponse(response);
  }

  delete = async (path, id) => {
    const res = await fetch(`${BASE_URL}/${path}/${id}`, { method: 'DELETE' });
    if (res.status >= 400)
      throw new Error(
        `Request to ${res.url} returned a ${res.status} status code`
      );
  }

  _getJsonFromResponse = async (res) => {
    if (res.status >= 400)
      throw new Error(
        `Request to ${res.url} returned a ${res.status} status code`
      );

    return res.json();
  };
}

export const apiClient = new ApiClient();