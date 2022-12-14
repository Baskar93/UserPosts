import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicpostsComponent } from './publicposts.component';

describe('PublicpostsComponent', () => {
  let component: PublicpostsComponent;
  let fixture: ComponentFixture<PublicpostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicpostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
