import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginfuncionarioComponent } from './loginfuncionario.component';

describe('LoginfuncionarioComponent', () => {
  let component: LoginfuncionarioComponent;
  let fixture: ComponentFixture<LoginfuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginfuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginfuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
