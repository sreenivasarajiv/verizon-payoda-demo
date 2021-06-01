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
      name: ['', Validators.required],
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

    this.profileConfigForm = this._fb.group({
      policy: ['', Validators.required],
      policies: this._fb.array([]),
    });

    this.createProfileService
      .getProfileType()
      .subscribe((data) => (this.profileTypes = data));

    this.createProfileService
      .getPolicies()
      .subscribe((data) => (this.policies = data));
  }

  saveData() {
    const data = {
      ...this.profileInfoForm.value,
      ...this.profileConfigForm.value,
      profileType: {
        code: this.profileInfoForm.value.profileType,
      },
    };
    delete data.policy;

    this.createProfileService.saveProfile(data).subscribe(
      (data) => console.log(data),
      (err) => console.error(err)
    );
  }
}
