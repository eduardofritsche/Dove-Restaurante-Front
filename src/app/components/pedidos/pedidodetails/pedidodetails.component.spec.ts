import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidodetailsComponent } from './pedidodetails.component';

describe('PedidodetailsComponent', () => {
  let component: PedidodetailsComponent;
  let fixture: ComponentFixture<PedidodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidodetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
