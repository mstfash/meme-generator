import { createContext, useMemo, useState } from 'react';

export interface TextBoxState {
  text: string;
  fontSize: string;
  color: string;
}

export const DefaultTextBoxState: TextBoxState = {
  text: 'add text',
  fontSize: '38',
  color: '#fff',
};

const TextBoxContext = createContext({
  textBoxes: [] as TextBoxState[],
  setTextBoxes: (prevState: TextBoxState[]) => {},
});

export default function useTextBoxConext() {
  const [textBoxes, setTextBoxes] = useState<TextBoxState[]>([
    DefaultTextBoxState,
  ]);
  const value = useMemo(
    () => ({ textBoxes, setTextBoxes }),
    [textBoxes, setTextBoxes]
  );
  return {
    value,
    TextBoxContext,
  };
}
