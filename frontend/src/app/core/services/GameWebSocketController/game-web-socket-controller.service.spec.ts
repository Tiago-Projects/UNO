import { TestBed } from '@angular/core/testing';

import { GameWebSocketControllerService } from './game-web-socket-controller.service';

describe('GameWebSocketControllerService', () => {
  let service: GameWebSocketControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameWebSocketControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
