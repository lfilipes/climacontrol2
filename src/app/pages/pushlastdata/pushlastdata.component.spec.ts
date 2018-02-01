import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushlastdataComponent } from './pushlastdata.component';

describe('PushlastdataComponent', () => {
  let component: PushlastdataComponent;
  let fixture: ComponentFixture<PushlastdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushlastdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushlastdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
