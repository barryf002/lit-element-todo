const BASE_URL = "http://localhost:5000";

class ApiClient {

  getJson = async (path) => {
    const response = await fetch(`${BASE_URL}/${path}`);
    return this._getJsonFromResponse(response);    
  }

  postJson = async(url, payload) => {
    var response = await fetch(`${BASE_URL}/${path}`, { 
      method: 'POST', 
      headers: { "Content-Type": 'application/json' }, 
      body: JSON.stringify({ content: this.newContent })
    });
    return this._getJsonFromResponse(response);
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
