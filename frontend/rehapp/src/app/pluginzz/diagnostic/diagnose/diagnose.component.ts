import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state-service.service';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss'],
})
export class DiagnoseComponent implements OnInit {

  @Input() diagnose: object;
  @Output() onBack: EventEmitter<null> = new EventEmitter;;

  constructor(private router: Router, private stateService: StateService) { }
  area: string = "";

  ngOnInit() {
  }

  back() {
    this.onBack.emit();
  }

  setArea(area: string) {
    if (this.area == area)
      this.area = "";
    else
      this.area = area;
  }

  redirect() {
    this.stateService.actualTreeComponent.next(null);
    this.stateService.resetValues = true;

    while (this.stateService.componentStack.length > 0)
      this.stateService.componentStack.pop();

    this.router.navigate(['/selection']);
  }
}