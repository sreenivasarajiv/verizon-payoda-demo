import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';

@Injectable({
  providedIn: 'root',
})
export class CreateProfileService {
  constructor(private _api: ApiService) {}

  getProfileType() {
    return this._api.get('profile-type');
  }

  getPolicies() {
    return this._api.get('policy');
  }

  saveProfile(data: any) {
    return this._api.post('profile', JSON.stringify(data));
  }
}
