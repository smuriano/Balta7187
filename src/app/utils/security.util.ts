import { environment } from './../../environments/environment';
import { User } from './../models/user.model';

export class SecurityUtils {
  public static set(user: User, token: string): void {
    this.setUser(user);
    this.setToken(token);
  }

  public static setUser(user: User): void {
    const data = JSON.stringify(user);
    localStorage.setItem(environment.keys.userKey, btoa(data));
  }

  public static setToken(token: string): void {
    localStorage.setItem(environment.keys.tokenKey, token);
  }

  public static getUser(): User {
    const data = localStorage.getItem(environment.keys.userKey);
    return data ? JSON.parse(atob(data)) : null;
  }

  public static getToken(): string {
    const data = localStorage.getItem(environment.keys.tokenKey);
    return data ? data : null;
  }

  public static hasToken(): boolean {
    return this.getToken() ? true : false;
  }

  public static clear(): void {
    localStorage.removeItem(environment.keys.userKey);
    localStorage.removeItem(environment.keys.tokenKey);
  }
}
