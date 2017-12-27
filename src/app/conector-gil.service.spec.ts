import { TestBed, inject } from '@angular/core/testing';

import { ConectorGilService } from './conector-gil.service';

describe('ConectorGilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConectorGilService]
    });
  });

  it('should be created', inject([ConectorGilService], (service: ConectorGilService) => {
    expect(service).toBeTruthy();
  }));
});
