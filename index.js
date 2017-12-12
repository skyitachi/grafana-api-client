const url = require("url");
const rp = require("request-promise");

class GrafanaClient {
  /**
   * @constructor
   * @param {Object} options 
   */
  constructor(options) {
    this._apiKey = options.apiKey;
    this._host = options.host;
  }

  createDashboard(dashboard, overwrite = false) {
    const endpoint = url.resolve(this._host, "/api/dashboards/db");
    console.log(endpoint);
    return rp({
      method: "POST",
      uri: endpoint,
      headers: {
        Authorization: `Bearer ${this._apiKey}`
      },
      body: {
        dashboard,
        overwrite
      },
      json: true
    });
  }

  deleteDashboard(dashboardName) {
    const endpoint = url.resolve(this._host, `/api/dashboards/db/${dashboardName}`);
    return rp({
      method: "DELETE",
      uri: endpoint,
      headers: {
        Authorization: `Bearer ${this._apiKey}`
      },
      json: true
    });
  }

  updateDashboard(dashboard) {
    return this.createDashboard(dashboard, true);
  }

  getDashboard(name) {
    return rp({ 
      method: "GET",
      headers: {
        Authorization: `Bearer ${this._apiKey}`
      },
      uri: `${url.resolve(this._host, `/api/dashboards/db/${name}`)}`,
      json: true
    });
  }
  
}

module.exports = GrafanaClient;
