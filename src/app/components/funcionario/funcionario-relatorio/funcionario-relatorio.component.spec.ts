import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioRelatorioComponent } from './funcionario-relatorio.component';

describe('FuncionarioRelatorioComponent', () => {
  let component: FuncionarioRelatorioComponent;
  let fixture: ComponentFixture<FuncionarioRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioRelatorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
