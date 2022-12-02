import axios, { AxiosInstance } from 'axios';
import { Buffer } from 'buffer';

export default class Client {
  private static apiKey: string = '';
  private static baseUrl: string = 'https://wakatime.com/api/v1';
  private static axios: AxiosInstance = axios.create({
    baseURL: Client.baseUrl,
    headers: {
      Authorization: `Basic ${Buffer.from(Client.apiKey).toString('base64')}`,
    },
  });
  private static connected: boolean = false;

  public static getApiKey() {
    return Client.apiKey;
  }

  public static async setApiKey(apiKey: string) {
    Client.apiKey = apiKey;
    Client.axios = axios.create({
      baseURL: `${Client.baseUrl}`,
      params: {
        api_key: Client.apiKey,
      },
    });
    return Client.isApiKeyValid().then((valid) => {
      Client.connected = valid;
      return valid;
    });
  }

  private static async isApiKeyValid() {
    try {
      const response = await Client.axios.get('/users/current');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  public static isConnected() {
    return Client.connected;
  }
  
  public static async getProjects(query: string) {
    return Client.axios.get('/users/current/projects', {
      params: {
        q: query,
      },
    });
  }

  public static async getProjectTime(project: string, start: string, end: string) {
    return Client.axios.get('/users/current/summaries', {
      params: {
        project,
        start,
        end,
      },
    });
  }
}