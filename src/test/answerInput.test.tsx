import { fireEvent, render, screen } from '@testing-library/react';
import { AnswerInput } from '../components/AnswerInput';

describe('AnswerInput', () => {
  it('submits on Enter without letting the keypress reach window-level "next" handlers', () => {
    const onSubmit = vi.fn();
    const windowEnter = vi.fn();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') windowEnter();
    };
    window.addEventListener('keydown', onKey);
    try {
      render(<AnswerInput unit="pct" value="12" onChange={() => {}} onSubmit={onSubmit} />);
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
      expect(onSubmit).toHaveBeenCalledTimes(1);
      // If this fired, QuizScreen would advance past the worked solution
      // in the same keystroke that submitted the answer.
      expect(windowEnter).not.toHaveBeenCalled();
    } finally {
      window.removeEventListener('keydown', onKey);
    }
  });
});
