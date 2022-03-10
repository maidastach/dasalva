import { TestBed } from '@angular/core/testing';

import { AddressResolver } from './address.resolver';

describe('AddressResolver', () => {
  let resolver: AddressResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AddressResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
