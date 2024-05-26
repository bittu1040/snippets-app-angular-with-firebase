import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSnippetsComponent } from './upload-snippets.component';

describe('UploadSnippetsComponent', () => {
  let component: UploadSnippetsComponent;
  let fixture: ComponentFixture<UploadSnippetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadSnippetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadSnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
