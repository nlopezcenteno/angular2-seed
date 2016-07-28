// Feel free to extend this interface
// depending on your app specific config.
export interface IConfig {
  API: string;
  Auth0ClientId: string;
  Auth0Domain: string;
}

export const Config: IConfig = JSON.parse('<%= ENV_CONFIG %>');
