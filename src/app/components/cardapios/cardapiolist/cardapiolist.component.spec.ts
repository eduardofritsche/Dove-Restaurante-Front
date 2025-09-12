import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapiolistComponent } from './cardapiolist.component';

describe('CardapiolistComponent', () => {
  let component: CardapiolistComponent;
  let fixture: ComponentFixture<CardapiolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardapiolistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardapiolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
