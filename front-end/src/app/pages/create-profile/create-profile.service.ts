import { HttpClient } from '@angular/common/http';
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
}
