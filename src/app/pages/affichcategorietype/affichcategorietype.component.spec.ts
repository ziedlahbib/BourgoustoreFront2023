import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichcategorietypeComponent } from './affichcategorietype.component';

describe('AffichcategorietypeComponent', () => {
  let component: AffichcategorietypeComponent;
  let fixture: ComponentFixture<AffichcategorietypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichcategorietypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichcategorietypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
