import { TestBed } from '@angular/core/testing';

import { ReplyEmailService } from './reply-email.service';

describe('ReplyEmailService', () => {
  let service: ReplyEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplyEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
