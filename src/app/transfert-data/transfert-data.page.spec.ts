import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransfertDataPage } from './transfert-data.page';

describe('TransfertDataPage', () => {
  let component: TransfertDataPage;
  let fixture: ComponentFixture<TransfertDataPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfertDataPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TransfertDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
