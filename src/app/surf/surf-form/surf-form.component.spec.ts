import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfFormComponent } from './surf-form.component';

describe('SurfFormComponent', () => {
  let component: SurfFormComponent;
  let fixture: ComponentFixture<SurfFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurfFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
