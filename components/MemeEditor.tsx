import { useOnClickOutside } from '@/hooks/useOneClickOutside';
import useTextBoxConext, {
  DefaultTextBoxState,
} from '@/hooks/useTextBoxContext';
import Image from 'next/image';
import { ChangeEvent, useContext } from 'react';
import { useRef, useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

const TextBox = ({ index }: { index: number }) => {
  const colorBoxRef = useRef(null);
  const { TextBoxContext } = useTextBoxConext();
  const { setTextBoxes, textBoxes } = useContext(TextBoxContext);

  const [showColorPicker, toggleColorPicker] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newState = [...textBoxes];
    const selected = newState.find((_, i) => i === index);
    if (selected) {
      newState[index] = { ...selected, text: e.target.value };
      setTextBoxes(newState);
    }
  };
  const handleColorChange = (color: ColorResult) => {
    const newState = [...textBoxes];
    newState[index].color = color.hex;
    setTextBoxes(newState);
  };

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newState = [...textBoxes];
    newState[index].fontSize = e.target.value;
    setTextBoxes(newState);
  };
  useOnClickOutside(colorBoxRef, () => toggleColorPicker(false));

  return (
    <div className="flex items-center justify-between p-3 rounded border border-gray-300 border-dashed">
      <input
        type="text"
        value={textBoxes[index].text}
        onChange={handleTextChange}
        className="border border-gray-300 rounded p-2 w-1/2"
      />
      <div
        className={`rounded w-10 h-8 relative cursor-pointer border border-gray-300`}
        style={{ background: textBoxes[index].color }}
        onClick={() => toggleColorPicker(true)}
      >
        {showColorPicker ? (
          <div
            className="absolute bottom-100 top-[40px] right-0 max-w-[150px]"
            ref={colorBoxRef}
          >
            <SketchPicker
              onChangeComplete={handleColorChange}
              color={textBoxes[index].color}
            />
          </div>
        ) : null}
      </div>

      <div>
        <div className="w-4 h-2 mb-3 text-sm ml-auto mr-5">
          {textBoxes[index].fontSize}px
        </div>
        <input
          className="max-w-[50px] lg:max-w-[100px]"
          type="range"
          min="10"
          max="100"
          value={textBoxes[index].fontSize}
          onChange={handleFontSizeChange}
        />
      </div>
    </div>
  );
};
const MemeEditor = () => {
  const { TextBoxContext } = useTextBoxConext();
  const { setTextBoxes, textBoxes } = useContext(TextBoxContext);
  const handleAddingTextBox = () => {
    setTextBoxes([...textBoxes, DefaultTextBoxState]);
  };
  const handleDeleteTextBox = (index: number) => {
    const newState = textBoxes.filter((_, i) => i !== index);
    setTextBoxes(newState);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Edit your Meme!</h3>
        <button
          className="rounded text-sm bg-gray-200 p-2"
          onClick={handleAddingTextBox}
        >
          Add Textbox
        </button>
      </div>
      <div className="mt-10">
        {textBoxes.map((_, index) => {
          return (
            <div
              key={index}
              className="mr-10 lg:mr-0"
              style={{ position: 'relative', zIndex: String(20 - index) }}
            >
              <TextBox index={index} />
              <button
                className="absolute right-[-40px] top-[30%] bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={() => handleDeleteTextBox(index)}
              >
                <Image
                  src="/trash.png"
                  alt="trash-img"
                  width="18"
                  height="13"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemeEditor;
