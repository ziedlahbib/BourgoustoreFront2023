import { TestBed } from '@angular/core/testing';

import { ArticlevenduServiceService } from './articlevendu-service.service';

describe('ArticlevenduServiceService', () => {
  let service: ArticlevenduServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlevenduServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
