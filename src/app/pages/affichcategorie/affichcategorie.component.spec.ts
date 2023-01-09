import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichcategorieComponent } from './affichcategorie.component';

describe('AffichcategorieComponent', () => {
  let component: AffichcategorieComponent;
  let fixture: ComponentFixture<AffichcategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichcategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichcategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
