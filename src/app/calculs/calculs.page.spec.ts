import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculsPage } from './calculs.page';

describe('CalculsPage', () => {
  let component: CalculsPage;
  let fixture: ComponentFixture<CalculsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
