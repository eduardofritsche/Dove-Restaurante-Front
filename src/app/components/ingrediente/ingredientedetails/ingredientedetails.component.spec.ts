import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientedetailsComponent } from './ingredientedetails.component';

describe('IngredientedetailsComponent', () => {
  let component: IngredientedetailsComponent;
  let fixture: ComponentFixture<IngredientedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientedetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
