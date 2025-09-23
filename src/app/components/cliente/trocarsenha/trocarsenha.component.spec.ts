import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrocarsenhaComponent } from './trocarsenha.component';

describe('TrocarsenhaComponent', () => {
  let component: TrocarsenhaComponent;
  let fixture: ComponentFixture<TrocarsenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrocarsenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrocarsenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
