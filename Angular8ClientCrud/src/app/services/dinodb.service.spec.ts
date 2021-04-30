import { TestBed } from '@angular/core/testing';

import { DinodbService } from './dinodb.service';

describe('DinodbService', () => {
  let service: DinodbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DinodbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
