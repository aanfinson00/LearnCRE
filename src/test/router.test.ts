import { MODE_PATHS, parseRoute, pathFor, type Mode } from '../router';

describe('router', () => {
  it('round-trips every mode through its path', () => {
    for (const mode of Object.keys(MODE_PATHS) as Mode[]) {
      expect(parseRoute(pathFor(mode)).mode).toBe(mode);
    }
  });

  it('falls back to the quiz for /, /app and unknown paths', () => {
    expect(parseRoute('/').mode).toBe('quiz');
    expect(parseRoute('/app').mode).toBe('quiz');
    expect(parseRoute('/no-such-page').mode).toBe('quiz');
  });

  it('tolerates trailing slashes and case', () => {
    expect(parseRoute('/Vocab/').mode).toBe('vocab');
  });

  it('parses certification sub-routes', () => {
    expect(parseRoute('/certify')).toEqual({ mode: 'certify', cert: { kind: 'list' } });
    expect(parseRoute('/certify/acq-analyst')).toEqual({
      mode: 'certify',
      cert: { kind: 'detail', certId: 'acq-analyst' },
    });
    expect(parseRoute('/certify/acq-analyst/exam')).toEqual({
      mode: 'certify',
      cert: { kind: 'exam', certId: 'acq-analyst' },
    });
    expect(pathFor('certify', { kind: 'exam', certId: 'acq-analyst' })).toBe(
      '/certify/acq-analyst/exam',
    );
  });
});
