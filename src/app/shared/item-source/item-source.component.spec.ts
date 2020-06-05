import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSourceComponent } from './item-source.component';

describe('ItemSourceComponent', () => {
  let component: ItemSourceComponent;
  let fixture: ComponentFixture<ItemSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
