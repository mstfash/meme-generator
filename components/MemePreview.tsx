/* eslint-disable @next/next/no-img-element */
import Draggable from 'react-draggable';
import { ImageFile } from './MemeCreator';
import { ChangeEvent, useContext, useRef } from 'react';
import useTextBoxConext from '@/hooks/useTextBoxContext';

const MemePreview = ({ file }: { file: ImageFile }) => {
  const memePreviewRef = useRef<HTMLDivElement>(null);
  const { TextBoxContext } = useTextBoxConext();
  const { textBoxes, setTextBoxes } = useContext(TextBoxContext);
  const handleTextChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    let newState = [...textBoxes];
    const selected = newState.find((_, i) => i === index);
    if (selected) {
      newState[index] = { ...selected, text: e.target.value };
      setTextBoxes(newState);
    }
  };

  return (
    <div className="absolute top-0 left-0 bg-white w-full h-full flex items-center justify-center">
      <div
        className="relative fit-content h-full overflow-hidden"
        id="meme-canvas"
        ref={memePreviewRef}
      >
        {textBoxes.length > 0
          ? textBoxes.map((textBox, index) => {
              return (
                <Draggable
                  defaultPosition={{ x: 50, y: 50 }}
                  handle={`.draggable-${index}`}
                  defaultClassName={'absolute'}
                  bounds="parent"
                  key={`draggable-${index}`}
                >
                  <div className={`group`}>
                    <div className={`draggable-${index} relative`}>
                      <button className="w-[100%] p-1 rounded bg-gray-200 text-sm invisible group-hover:visible">
                        Drag here
                      </button>
                    </div>
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      spellCheck={false}
                      className={`content-editable cursor-pointer text-center max-w-[400px] rounded bg-transparent resize-none group-hover:resize  group-hover:border-gray-400 border-2 border-transparent font-extrabold`}
                      style={{
                        fontSize: `${textBox.fontSize}px`,
                        color: `${textBox.color}`,
                        lineHeight: `${textBox.fontSize}px`,
                      }}
                    >
                      {textBox.text}
                    </div>
                  </div>
                </Draggable>
              );
            })
          : null}
        <img
          src={file.preview}
          className="max-h-[100%] m-auto"
          alt="image preview"
        />
      </div>
    </div>
  );
};

export default MemePreview;
