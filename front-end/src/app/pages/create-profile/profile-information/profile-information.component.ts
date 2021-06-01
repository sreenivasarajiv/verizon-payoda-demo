import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.sass'],
})
export class ProfileInformationComponent implements OnInit {
  @Input() inputForm: any = null;
  @Input() profileTypes: any = null;

  constructor() {}

  ngOnInit(): void {}
}
