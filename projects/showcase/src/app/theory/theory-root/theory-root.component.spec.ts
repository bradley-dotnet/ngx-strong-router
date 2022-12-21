import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoryRootComponent } from './theory-root.component';

describe('TheoryRootComponent', () => {
  let component: TheoryRootComponent;
  let fixture: ComponentFixture<TheoryRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheoryRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheoryRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
