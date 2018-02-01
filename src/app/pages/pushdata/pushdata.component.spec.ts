import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushdataComponent } from './pushdata.component';

describe('PushdataComponent', () => {
  let component: PushdataComponent;
  let fixture: ComponentFixture<PushdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
