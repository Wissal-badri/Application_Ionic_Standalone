import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeuxPage } from './jeux.page';

describe('JeuxPage', () => {
  let component: JeuxPage;
  let fixture: ComponentFixture<JeuxPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JeuxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
