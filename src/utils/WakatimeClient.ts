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

  public async isApiKeyValid() {
    try {
      const response = await this.axios.get('/users/current');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  public async getSummary(date: string) {
    return this.axios.get(`/users/current/summaries?date=${date}`);
  }

  public async getHeartbeats(date: string) {
    return this.axios.get(`/users/current/heartbeats?date=${date}`);
  }

  public async getProjects(date: string) {
    return this.axios.get(`/users/current/projects?date=${date}`);
  }

  public async getLanguages(date: string) {
    return this.axios.get(`/users/current/languages?date=${date}`);
  }

  public async getEditors(date: string) {
    return this.axios.get(`/users/current/editors?date=${date}`);
  }

  public async getDependencies(date: string) {
    return this.axios.get(`/users/current/dependencies?date=${date}`);
  }

  public async getGoals(date: string) {
    return this.axios.get(`/users/current/goals?date=${date}`);
  }

  public async getStats(date: string) {
    return this.axios.get(`/users/current/stats/last_7_days?date=${date}`);
  }
}