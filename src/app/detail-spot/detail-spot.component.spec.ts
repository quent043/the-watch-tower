import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSpotComponent } from './detail-spot.component';

describe('DetailSpotComponent', () => {
  let component: DetailSpotComponent;
  let fixture: ComponentFixture<DetailSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
