import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile-configuration',
  templateUrl: './profile-configuration.component.html',
  styleUrls: ['./profile-configuration.component.sass'],
})
export class ProfileConfigurationComponent implements OnInit {
  @Input() inputForm: any = null;
  @Input() policies: any = null;
  currentPolicy: any;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    (this.inputForm.get('policy') as AbstractControl).valueChanges.subscribe(
      (policyId) => {
        this.currentPolicy = this.policies.find(
          (p: { _id: string }) => p._id === policyId
        );

        const newForm = this._fb.group({
          generateOptions: this._fb.group({
            generateSmartToken: [
              this.currentPolicy.generateOptions.generateSmartToken,
            ],
            generateSoftwareKey: [
              this.currentPolicy.generateOptions.generateSoftwareKey,
            ],
            enableExternalCSR: [
              this.currentPolicy.generateOptions.enableExternalCSR,
            ],
            generateSoftwareKeyServerSide: [
              this.currentPolicy.generateOptions.generateSoftwareKeyServerSide,
            ],
          }),
          policy: [this.currentPolicy.policy, Validators.required],
        });

        (this.inputForm.get('policies') as FormArray).push(newForm);
      }
    );
  }
}
