import got from "got";
import WhmcsApi from "..";

export abstract class BaseModule {
  async request(methodName: string, options?: any): Promise<any> {
    options.identifier = WhmcsApi.options.identifier;
    options.secret = WhmcsApi.options.secret;
    options.action = methodName;
    options.responsetype = "json";

    try {
      const res = await got(WhmcsApi.options.apiUrl, {
        method: "post",
        form: options,
        throwHttpErrors: false,
      });

      const data = this.safeJsonParse(res.body);

      if (!data) {
        throw new Error(
          `Invalid JSON response. Status: ${res.statusCode}. Raw Response: ${res.body}`
        );
      }

      if (res.statusCode !== 200) {
        throw new Error(
          `HTTP Error ${res.statusCode}. Response: ${JSON.stringify(data)}`
        );
      }

      return data;
    } catch (error) {
      throw new Error(
        `Request Failed: ${error.message}. ${
          error.response ? `Response: ${error.response.body}` : ""
        }`
      );
    }
  }

  private safeJsonParse(body: string): any | null {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }
}
