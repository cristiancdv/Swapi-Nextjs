import config from '@/config/config';


describe('config', () => {
  it('should contain a valid apiUrl', () => {
    expect(config.apiUrl).toBeDefined();
    expect(typeof config.apiUrl).toBe('string');
    expect(config.apiUrl).toMatch(/^https?|http?:\/\//);
  });
});
