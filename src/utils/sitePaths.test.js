import { describe, expect, it } from 'vitest';
import { getAppPath, getRoutePath } from './sitePaths';

describe('GitHub Pages base paths', () => {
  it('creates app links for project and root sites', () => {
    expect(getAppPath('/privacidad', '/nebula-site/')).toBe('/nebula-site/privacidad');
    expect(getAppPath('/', '/nebula-site/')).toBe('/nebula-site/');
    expect(getAppPath('/privacidad', '/')).toBe('/privacidad');
  });

  it('keeps section links inside the configured project base', () => {
    expect(getAppPath('#contact', '/nebula-site/')).toBe('/nebula-site/#contact');
  });

  it('normalizes deep links while preserving the route name', () => {
    expect(getRoutePath('/nebula-site/privacidad', '/nebula-site/')).toBe('/privacidad');
    expect(getRoutePath('/nebula-site/', '/nebula-site/')).toBe('/');
    expect(getRoutePath('/privacidad', '/')).toBe('/privacidad');
  });
});
