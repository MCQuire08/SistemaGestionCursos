import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProgressComponent } from './modal-progress.component';

describe('ModalProgressComponent', () => {
  let component: ModalProgressComponent;
  let fixture: ComponentFixture<ModalProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
