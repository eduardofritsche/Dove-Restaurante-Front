import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioDetailsComponent } from './funcionariodetails.component';

describe('FuncionarioDetailsComponent', () => {
  let component: FuncionarioDetailsComponent;
  let fixture: ComponentFixture<FuncionarioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
