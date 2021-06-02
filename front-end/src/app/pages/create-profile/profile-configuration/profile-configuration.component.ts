import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile-configuration',
  templateUrl: './profile-configuration.component.html',
  styleUrls: ['./profile-configuration.component.sass'],
})
export class ProfileConfigurationComponent implements OnInit {
  @Input() inputForm!: any;
  @Input() policies: any = null;
  @Input() originalPolicies: any = null;
  @Output() saveData = new EventEmitter();
  preservedPolicies: any = [];
  currentPolicy: any;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {}

  getPolicyName(form: any) {
    const preservedPolicy = this.preservedPolicies.find(
      (p: { form: any }) => p.form === form
    );
    return preservedPolicy.policy.name;
  }

  addPolicy(policyId: string) {
    this.inputForm.get('policy')?.markAsTouched();

    if (!policyId) return;

    this.currentPolicy = this.policies.filter(
      (p: { _id: string }) => p._id === policyId
    )[0];

    this.policies.splice(this.policies.indexOf(this.currentPolicy), 1);

    const newForm = this._fb.group({
      name: [this.currentPolicy.name],
      generateOptions: this._fb.group({
        generateSmartToken: [
          this.currentPolicy.generateOptions.generateSmartToken || false,
        ],
        generateSoftwareKey: [
          this.currentPolicy.generateOptions.generateSoftwareKey || false,
        ],
        enableExternalCSR: [
          this.currentPolicy.generateOptions.enableExternalCSR || false,
        ],
        generateSoftwareKeyServerSide: [
          this.currentPolicy.generateOptions.generateSoftwareKeyServerSide ||
            false,
        ],
      }),
      policy: [this.currentPolicy.policy, Validators.required],
      raOptions: this._fb.group({
        requiredCertOrders: this._fb.group({
          value: [this.currentPolicy.raOptions.requiredCertOrders.value || 0],
          bypass: [
            this.currentPolicy.raOptions.requiredCertOrders.bypass || false,
          ],
        }),
        requiredCertStatus: this._fb.group({
          value: [this.currentPolicy.raOptions.requiredCertStatus.value || 0],
          bypass: [
            this.currentPolicy.raOptions.requiredCertStatus.bypass || false,
          ],
        }),
        requiredKeyRecovery: [
          this.currentPolicy.raOptions.requiredKeyRecovery || 0,
        ],
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
    this.currentPolicy = null;
  }

  deletePolicy(policyName: string, formIndex: number) {
    if (!policyName) return;

    const policy = this.preservedPolicies.find(
      (p: any) => p.policy.name === policyName
    );

    this.policies.push(_.cloneDeep(policy.policy));

    (this.inputForm.get('policies') as FormArray).removeAt(formIndex);

    if (this.policies.length === this.originalPolicies.length)
      this.currentPolicy = null;
  }
}
