import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.sass'],
})
export class ProfileInformationComponent implements OnInit {
  @Input() inputForm: any = null;
  @Input() profileTypes: any = null;
  @Output() next = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  stepperAction(step: string) {
    this.next.emit();
  }
}
