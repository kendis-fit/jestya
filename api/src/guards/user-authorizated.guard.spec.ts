import { UserAuthorizatedGuard } from './user-authorizated.guard';

describe('UserAuthorizatedGuard', () => {
  it('should be defined', () => {
    expect(new UserAuthorizatedGuard()).toBeDefined();
  });
});
