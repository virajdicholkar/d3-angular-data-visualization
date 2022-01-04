import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLineComponentComponent } from './multi-line-component.component';

describe('MultiLineComponentComponent', () => {
  let component: MultiLineComponentComponent;
  let fixture: ComponentFixture<MultiLineComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiLineComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLineComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
