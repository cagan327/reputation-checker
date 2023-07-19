const fetch = require("node-fetch-commonjs");
const url =
  "https://api.sanctionscanner.com/api/Search/SearchByDocumentNumber?documentNumber=";
class Checker {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.auth = Buffer.from(`${this.username}:${this.password}`).toString(
      "base64"
    );
  }

  async check(nationalId, maxAcceptable) {
    if (isNaN(maxAcceptable) || maxAcceptable < 0 || maxAcceptable > 6) {
      throw "Invalid maxAcceptable number";
    }
    try {
      const response = await fetch(`${url}/${nationalId}`, {
        method: "GET",
        headers: {
          Authorization: "Basic " + this.auth,
        },
      });
      const data = await response.json();

      const result = {
        isSuccess: data.IsSuccess,
        isError: data.ErrorCode || data.ErrorMessage,
        Reference: data.Result.OutReferenceNumber,
        isRisky: data.Result.RiskLevelId > maxAcceptable,
      };
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

module.exports = Checker;
