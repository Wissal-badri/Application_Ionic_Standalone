import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaptureMediaPage } from './capture-media.page';

describe('CaptureMediaPage', () => {
  let component: CaptureMediaPage;
  let fixture: ComponentFixture<CaptureMediaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureMediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
