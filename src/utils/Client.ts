import axios, { AxiosInstance } from 'axios';
import { Buffer } from 'buffer';

/**
 * A client for the Wakatime API.
 */
export default class Client {
  private static apiKey: string = localStorage.getItem('apiKey') || '';
  private static baseUrl: string = 'https://wakatime.com/api/v1';
  private static axios: AxiosInstance = axios.create({
    baseURL: Client.baseUrl,
    headers: {
      Authorization: `Basic ${Buffer.from(Client.apiKey).toString('base64')}`,
    },
  });
  private static connected: boolean = Client.apiKey.length > 0;

  public static getApiKey() {
    return Client.apiKey;
  }

  public static async setApiKey(apiKey: string) {
    Client.apiKey = apiKey;
    localStorage.setItem('apiKey', apiKey);
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
  
  public static async getProjects(query: string = "", page: number = 1) {
    return Client.axios.get('/users/current/projects', {
      params: {
        q: query,
        page,
      },
    }).then((response) => {
      return response.data.data;
    });
  }

  public static async getProjectTime(project: string, start: string, end: string) {
    return Client.axios.get('/users/current/summaries', {
      params: {
        project,
        start,
        end,
      },
    }).then((response) => {
      return response.data.data;
    });
  }
}