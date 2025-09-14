import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginclienteComponent } from './logincliente.component';

describe('LoginclienteComponent', () => {
  let component: LoginclienteComponent;
  let fixture: ComponentFixture<LoginclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginclienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
