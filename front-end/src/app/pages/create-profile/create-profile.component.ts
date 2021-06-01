import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProfileService } from './create-profile.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.sass'],
})
export class CreateProfileComponent implements OnInit {
  profileInfoForm!: FormGroup;
  profileConfigForm!: FormGroup;
  profileTypes: any = [];
  policies: any = [];

  constructor(
    private _fb: FormBuilder,
    private createProfileService: CreateProfileService
  ) {}

  ngOnInit(): void {
    this.profileInfoForm = this._fb.group({
      profileType: ['', Validators.required],
      profileName: ['', Validators.required],
      emailAddresses: this._fb.group({
        raFromEmailAddress: ['', [Validators.required, Validators.email]],
        supportEmailAddress: ['', [Validators.required, Validators.email]],
        nickName: ['', Validators.required],
      }),
      websites: this._fb.group({
        secureURL: ['', Validators.required],
        gdpr: [false, Validators.required],
      }),
    });

    this.profileInfoForm.get('profileType')?.value;

    this.profileConfigForm = this._fb.group({});

    this.createProfileService
      .getProfileType()
      .subscribe((data) => (this.profileTypes = data));
  }
}
