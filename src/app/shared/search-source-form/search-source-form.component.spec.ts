import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSourceFormComponent } from './search-source-form.component';

describe('SearchSourceFormComponent', () => {
  let component: SearchSourceFormComponent;
  let fixture: ComponentFixture<SearchSourceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSourceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
