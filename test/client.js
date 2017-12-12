const { assert } = require("chai");
const GrafanaClient = require("../");
const dashboard = require("grafana-dsl").default;

describe("grafana api client test", function () {
  let client;
  const dashboardName = "test-dashboard";
  before(function () {
    client = new GrafanaClient({
      apiKey: "eyJrIjoiU0JoYXZCRVZyNFZab0JMVWpOcE1HSzNQT25BM0tPSlkiLCJuIjoiYWRtaW4iLCJpZCI6MX0=",
      host: "http://localhost:10001"
    });
  });

  it("CRUD successful", function (done) {
    const dash = dashboard()
      .title(dashboardName)
      .serialize();
    client
      .createDashboard(dash)
      .then(res => {
        assert.equal(res.status, "success");
      })
      .then(() => client.getDashboard(dashboardName))
      .then(res => {
        assert.typeOf(res.dashboard, "object");
      })
      .then(() => client.deleteDashboard(dashboardName))
      .then(res => {
        assert.equal(res.title, dashboardName);
        done();
      })
      .catch(err => {
        client.deleteDashboard(dashboardName).then(() => done());
      });
  });
  
  it("delete not exist dashboard should throw 404", function (done) {
    client
      .deleteDashboard(dashboardName + Math.random())
      .catch(err => {
        assert.equal(err.statusCode, 404);
        done();
      });
  });

  it("should throw unauthorized error", function (done) {
    const client2 = new GrafanaClient({
      apiKey: "none authorized",
      host: "http://localhost:10001"
    });
    client2
      .getDashboard(dashboardName)
      .catch(err => {
        assert.equal(err.statusCode, 401);
        done();
      })
  });
  
});