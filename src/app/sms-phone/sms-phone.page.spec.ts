import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmsPhonePage } from './sms-phone.page';

describe('SmsPhonePage', () => {
  let component: SmsPhonePage;
  let fixture: ComponentFixture<SmsPhonePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
