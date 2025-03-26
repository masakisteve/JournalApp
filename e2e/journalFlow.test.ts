import { device, element, by, expect } from 'detox';

describe('Journal Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login and create a journal entry', async () => {
    // Login
    await element(by.id('email-input')).typeText('test@test.com');
    await element(by.id('password-input')).typeText('password');
    await element(by.id('login-button')).tap();

    // Create new entry
    await element(by.id('new-entry-button')).tap();
    await element(by.id('title-input')).typeText('Test Entry');
    await element(by.id('content-input')).typeText('This is a test entry');
    await element(by.id('save-button')).tap();

    // Verify entry was created
    await expect(element(by.text('Test Entry'))).toBeVisible();
  });
});