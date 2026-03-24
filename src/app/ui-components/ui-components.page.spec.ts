import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiComponentsPage } from './ui-components.page';

describe('UiComponentsPage', () => {
  let component: UiComponentsPage;
  let fixture: ComponentFixture<UiComponentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UiComponentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
