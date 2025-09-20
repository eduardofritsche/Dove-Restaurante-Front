import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariolistComponent } from './funcionariolist.component';

describe('FuncionariolistComponent', () => {
  let component: FuncionariolistComponent;
  let fixture: ComponentFixture<FuncionariolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariolistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
