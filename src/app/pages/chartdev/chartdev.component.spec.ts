import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartdevComponent } from './chartdev.component';

describe('ChartdevComponent', () => {
  let component: ChartdevComponent;
  let fixture: ComponentFixture<ChartdevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartdevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartdevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
