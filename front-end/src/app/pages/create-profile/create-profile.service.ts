import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateProfileService {
  apiBase = 'http://localhost:3000/api/';

  constructor(private _http: HttpClient) {}

  getProfileType() {
    return this._http.get(this.apiBase + 'profile-type');
  }

  getPolicies() {
    return this._http.get(this.apiBase + 'policy');
  }

  saveProfile(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this._http.post(
      this.apiBase + 'profile',
      JSON.stringify(data),
      httpOptions
    );
  }
}
