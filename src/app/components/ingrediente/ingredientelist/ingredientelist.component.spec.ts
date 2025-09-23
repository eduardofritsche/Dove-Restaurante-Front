import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientelistComponent } from './ingredientelist.component';

describe('IngredientelistComponent', () => {
  let component: IngredientelistComponent;
  let fixture: ComponentFixture<IngredientelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
