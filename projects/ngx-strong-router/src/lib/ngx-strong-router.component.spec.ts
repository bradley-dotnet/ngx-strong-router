import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxStrongRouterComponent } from './ngx-strong-router.component';

describe('NgxStrongRouterComponent', () => {
  let component: NgxStrongRouterComponent;
  let fixture: ComponentFixture<NgxStrongRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxStrongRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxStrongRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
