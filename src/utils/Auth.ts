import storage from '../res/storage.json';

export default class Auth {
  private static readonly clientId: string = "T1VBlX4sjYhhIIk8Dk7n8po7";
  private static readonly clientSecret: string = "waka_sec_kLwKssyVVcJu5vl5RdnnUKPR5gV3bBGglTmsOuyGHbmc2LvysfncI4MhMHZlroHfujaHFgD8Mnqr5GKp";
  private static readonly redirectUri: string = "https://www.bsodium.fr/moneytor/authenticate";

  private static sessionCode: string | null = null;
  private static accessToken: string | null = null;
  private static refreshToken: string | null = null;

  public static loadCredentials() {
    Auth.sessionCode = localStorage.getItem(storage.auth.sessionCode);
    Auth.accessToken = localStorage.getItem(storage.auth.accessToken);
    Auth.refreshToken = localStorage.getItem(storage.auth.refreshToken);

    // If the storage is empty, we need to create a new session

    if (!Auth.sessionCode || !Auth.accessToken || !Auth.refreshToken) {
      Auth.createSession();
    }
  }

  public static async createSession() {
    window.open(`https://wakatime.com/oauth/authorize?client_id=${
      Auth.clientId
    }&response_type=code&redirect_uri=${
      Auth.redirectUri
    }&scope=read_stats`, '_blank');
  }
}