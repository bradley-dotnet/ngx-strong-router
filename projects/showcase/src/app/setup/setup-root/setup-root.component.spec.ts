import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupRootComponent } from './setup-root.component';

describe('SetupRootComponent', () => {
  let component: SetupRootComponent;
  let fixture: ComponentFixture<SetupRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SetupRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
