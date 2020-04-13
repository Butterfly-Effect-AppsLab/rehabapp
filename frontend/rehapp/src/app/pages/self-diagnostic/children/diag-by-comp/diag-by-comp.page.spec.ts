import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiagByCompPage } from './diag-by-comp.page';

describe('DiagByCompPage', () => {
  let component: DiagByCompPage;
  let fixture: ComponentFixture<DiagByCompPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagByCompPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiagByCompPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
