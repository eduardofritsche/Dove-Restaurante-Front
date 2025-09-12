import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapiodetailsComponent } from './cardapiodetails.component';

describe('CardapiodetailsComponent', () => {
  let component: CardapiodetailsComponent;
  let fixture: ComponentFixture<CardapiodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardapiodetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardapiodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
