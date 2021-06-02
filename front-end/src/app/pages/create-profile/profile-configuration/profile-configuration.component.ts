import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile-configuration',
  templateUrl: './profile-configuration.component.html',
  styleUrls: ['./profile-configuration.component.sass'],
})
export class ProfileConfigurationComponent implements OnInit {
  @Input() inputForm: any = null;
  @Input() policies: any = null;
  @Output() saveData = new EventEmitter();
  preservedPolicies: any = [];
  currentPolicy: any;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    setTimeout(() => {
      (this.inputForm.get('policy') as FormControl).setValue(
        '60b5de757872851150e741ec'
      );
      this.addPolicy('60b5de757872851150e741ec');
    }, 1000);
  }

  getPolicyName(form: any) {
    const preservedPolicy = this.preservedPolicies.find(
      (p: { form: any }) => p.form === form
    );
    return preservedPolicy.policy.name;
  }

  addPolicy(policyId: string) {
    if (!policyId) return;

    this.currentPolicy = this.policies.filter(
      (p: { _id: string }) => p._id === policyId
    )[0];

    this.policies.splice(this.policies.indexOf(this.currentPolicy), 1);

    const newForm = this._fb.group({
      name: [this.currentPolicy.name],
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
      raOptions: this._fb.group({
        requiredCertOrders: this._fb.group({
          value: [this.currentPolicy.raOptions.requiredCertOrders.value],
          bypass: [this.currentPolicy.raOptions.requiredCertOrders.bypass],
        }),
        requiredCertStatus: this._fb.group({
          value: [this.currentPolicy.raOptions.requiredCertStatus.value],
          bypass: [this.currentPolicy.raOptions.requiredCertStatus.bypass],
        }),
        requiredKeyRecovery: [this.currentPolicy.raOptions.requiredKeyRecovery],
      }),
    });

    this.preservedPolicies.push({
      form: newForm,
      policy: _.cloneDeep(this.currentPolicy),
    });

    (this.inputForm.get('policies') as FormArray).push(newForm);
  }

  save() {
    this.saveData.emit();
  }

  deletePolicy(policyName: string, formIndex: number) {
    if (!policyName) return;

    const policy = this.preservedPolicies.find(
      (p: any) => p.policy.name === policyName
    );

    this.policies.push(_.cloneDeep(policy.policy));

    (this.inputForm.get('policies') as FormArray).removeAt(formIndex);
  }
}
