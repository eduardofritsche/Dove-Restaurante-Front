import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredienteDetailsComponent } from './ingredientedetails.component';

describe('IngredientedetailsComponent', () => {
  let component: IngredienteDetailsComponent;
  let fixture: ComponentFixture<IngredienteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredienteDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredienteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
