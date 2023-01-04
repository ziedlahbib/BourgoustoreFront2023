import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassercommandedialogComponentComponent } from './passercommandedialog-component.component';

describe('PassercommandedialogComponentComponent', () => {
  let component: PassercommandedialogComponentComponent;
  let fixture: ComponentFixture<PassercommandedialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassercommandedialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassercommandedialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
