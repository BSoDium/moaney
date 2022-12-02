import storage from '../res/storage.json';

export default class Auth {
  private static readonly clientId: string = "T1VBlX4sjYhhIIk8Dk7n8po7";
  private static readonly clientSecret: string = "waka_sec_kLwKssyVVcJu5vl5RdnnUKPR5gV3bBGglTmsOuyGHbmc2LvysfncI4MhMHZlroHfujaHFgD8Mnqr5GKp";
  private static readonly redirectUri: string = "https://www.bsodium.fr/moneytor";

  private static sessionCode: string | null = null;
  private static accessToken: string | null = null;
  private static refreshToken: string | null = null;

  public static loadCredentials() {
    Auth.sessionCode = localStorage.getItem(storage.auth.sessionCode);

    // If the storage is empty, we need to create a new session
    if (!Auth.sessionCode) {
      Auth.createSession();
    }

    // If the session code is not null, we need to get the access token

  }

  public static async createSession() {
    window.open(`https://wakatime.com/oauth/authorize?client_id=${
      Auth.clientId
    }&response_type=code&redirect_uri=${
      Auth.redirectUri
    }&scope=read_stats`, '_blank');
  }

  public static async setSessionCode(code: string) {
    Auth.sessionCode = code;
    localStorage.setItem(storage.auth.sessionCode, code);
  }
}