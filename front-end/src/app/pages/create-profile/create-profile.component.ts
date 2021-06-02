import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProfileService } from './create-profile.service';
import * as _ from 'lodash';
import SWAL from 'sweetalert2';
import { MatStepper } from '@angular/material/stepper';

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
  originalPolicies: any = [];
  @ViewChild('stepper') private myStepper!: MatStepper;

  constructor(
    private _fb: FormBuilder,
    private createProfileService: CreateProfileService
  ) {}

  ngOnInit(): void {
    this.profileInfoForm = this._fb.group({
      profileType: ['', Validators.required],
      name: ['', Validators.required],
      emailAddresses: this._fb.group({
        raFromEmailAddress: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        supportEmailAddress: ['', [Validators.required, Validators.email]],
        nickName: ['', Validators.required],
      }),
      websites: this._fb.group({
        secureURL: ['', Validators.required],
        gdpr: [false],
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

    this.createProfileService.getPolicies().subscribe((data) => {
      this.policies = data;
      this.originalPolicies = _.cloneDeep(data);
    });
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
      (data) => {
        this.resetValues()
        SWAL.fire({
          title: 'Success',
          text: 'Profile saved successfully!',
          icon: 'success',
          heightAuto: false,
        });
      },
      (err) =>
        SWAL.fire({
          title: 'Error',
          text: 'Something went wrong!',
          icon: 'error',
          heightAuto: false,
        })
    );
  }

  stepperAction() {
    if (!this.profileInfoForm.valid) {
      this.profileInfoForm.markAllAsTouched();
    } else {
      this.myStepper.next();
    }
  }

  resetValues() {
    this.profileInfoForm.reset();
    (this.profileConfigForm.get('policies') as FormArray).clear();
    this.profileConfigForm.reset();
    this.policies = _.cloneDeep(this.originalPolicies);
    this.myStepper.reset();
    this.profileInfoForm.get('profileType')?.setValue('');
    this.profileConfigForm.get('policy')?.setValue('');
  }
}
