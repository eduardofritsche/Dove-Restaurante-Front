import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidolistComponent } from './pedidolist.component';

describe('PedidolistComponent', () => {
  let component: PedidolistComponent;
  let fixture: ComponentFixture<PedidolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidolistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
