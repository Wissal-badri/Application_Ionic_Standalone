import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TorchPage } from './torch.page';

describe('TorchPage', () => {
  let component: TorchPage;
  let fixture: ComponentFixture<TorchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TorchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
