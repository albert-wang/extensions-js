import Analytics from '../src/analytics';
import { DebugOptions, DefaultDebugOptions } from '../src/debug';
import Messenger from '../src/messenger';
import SDK from '../src/sdk';
import StateClient from '../src/state-client';
import { TwitchAuth } from '../src/twitch';
import User from '../src/user';

const someJWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiMTI2OTU1MjExIiwicm9sZSI6InZpZXdlciIsImV4dGVuc2lvbl9pZCI6ImthM3kyOHJyZ2gyZjUzM214dDltbDM3ZnY2emI4ayIsImV4cCI6MjE0NzQ4MzY0Nywib3BhcXVlX3VzZXJfaWQiOiJBODk0MzIzNiIsImFsbG93ZWRfc3RhZ2UiOiJ0ZXN0aW5nIiwiYXBwX2lkIjoibXlfYXdlc29tZV9hcHAifQ.0a5_yR6bTc2V4boC0kH_0mz2v34dJQq4p1iOBA70lt4';

// tslint:disable-next-line
let prom, analytics, client, messenger, user;

describe('SDK', () => {
  beforeAll(() => {
    const auth = new TwitchAuth();
    Object.assign(auth, {
      channelId: '12345678',
      clientId: 'client id',
      token: someJWT,
      userId: 'T12345678'
    });

    prom = Promise.resolve();
    analytics = new Analytics('ua-string', prom);
    client = new StateClient(new DefaultDebugOptions());
    messenger = Messenger(new DefaultDebugOptions());
    messenger.close();
    user = new User(auth);
  });

  it('can be created', () => {
    const sdk = new SDK(
      'test',
      client,
      user,
      messenger,
      analytics,
      prom,
      [],
      new DefaultDebugOptions()
    );
  });

  it('should generate a offset date object', () => {
    const sdk = new SDK(
      'test',
      client,
      user,
      messenger,
      analytics,
      prom,
      [],
      new DefaultDebugOptions()
    );
    sdk.timeOffset = 10;

    const newDate = sdk.getOffsetDate();
    const curDate = new Date();

    expect(newDate.getTime() - curDate.getTime()).toEqual(10);
  });
});
