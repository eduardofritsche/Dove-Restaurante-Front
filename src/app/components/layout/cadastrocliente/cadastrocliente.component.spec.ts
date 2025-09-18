import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cadastrocliente } from './cadastrocliente.component';

describe('Cadastrocliente', () => {
  let component: Cadastrocliente;
  let fixture: ComponentFixture<Cadastrocliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cadastrocliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cadastrocliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
