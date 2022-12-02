import axios from 'axios';
import { Buffer } from 'buffer';

export default class WakatimeClient {
  private apiKey: string;
  private baseUrl: string;
  private axios: any;

  constructor(apiKey: string, baseUrl: string = 'https://wakatime.com/api/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.axios = axios.create({
      baseURL: `${this.baseUrl}`,
      params: {
        api_key: this.apiKey,
      },
    });
    console.log(Buffer.from(this.apiKey).toString('base64'));
  }

  public setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    this.axios = axios.create({
      baseURL: `${this.baseUrl}`,
      params: {
        api_key: this.apiKey,
      },
    });
  }

  public getApiKey() {
    return this.apiKey;
  }

  public async isApiKeyValid() {
    try {
      const response = await this.axios.get('/users/current');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
  
  public async getProjects() {
    return this.axios.get('/users/current/projects');
  }

  public async getProjectTime(project: string, start: string, end: string) {
    return this.axios.get('/users/current/summaries', {
      params: {
        project,
        start,
        end,
      },
    });
  }
}