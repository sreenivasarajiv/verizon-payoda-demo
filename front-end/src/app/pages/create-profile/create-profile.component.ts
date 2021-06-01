import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.sass'],
})
export class CreateProfileComponent implements OnInit {
  profileInfoForm!: FormGroup;
  profileConfigForm!: FormGroup;

  constructor(private _fb: FormBuilder) {}

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
  }
}
