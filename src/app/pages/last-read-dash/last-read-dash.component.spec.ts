import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastReadDashComponent } from './last-read-dash.component';

describe('LastReadDashComponent', () => {
  let component: LastReadDashComponent;
  let fixture: ComponentFixture<LastReadDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastReadDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastReadDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
