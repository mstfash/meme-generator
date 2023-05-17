/* eslint-disable @next/next/no-img-element */
import Draggable from 'react-draggable';
import Cropper, { Area } from 'react-easy-crop';
import { ImageFile } from './MemeCreator';
import {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import useTextBoxConext from '@/hooks/useTextBoxContext';
import { getCroppedImg } from '@/app/utils/canvasutils';

const MemePreview = forwardRef(
  (
    {
      file,
      initiateCrop,
      rotation,
      setRotation,
    }: {
      file: ImageFile;
      initiateCrop: boolean;
      rotation: number;
      setRotation: (val: number) => void;
    },
    ref
  ) => {
    const memePreviewRef = useRef<HTMLDivElement>(null);
    const [croppedImage, setCroppedImage] = useState<string>();
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const { TextBoxContext } = useTextBoxConext();
    const { textBoxes } = useContext(TextBoxContext);

    const onCropComplete = useCallback(
      (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
      },
      []
    );

    const handleSaveEdits = useCallback(async () => {
      try {
        const croppedImage = await getCroppedImg(
          file.preview,
          croppedAreaPixels as Area,
          rotation
        );
        console.log('donee', { croppedImage });
        setCroppedImage(croppedImage as string);
      } catch (e) {
        console.error(e);
      }
    }, [file, croppedAreaPixels, rotation]);

    useImperativeHandle(ref, () => ({
      saveEdits() {
        handleSaveEdits();
      },
    }));

    return (
      <div className="bg-white items-center w-full h-full  justify-center">
        <div
          className="relative w-full h-full overflow-hidden"
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
                        className={`content-editable cursor-pointer text-center max-w-[500px] rounded bg-transparent resize-none group-hover:resize  group-hover:border-gray-400 border-2 border-transparent font-extrabold`}
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
          {initiateCrop ? (
            <Cropper
              image={file.preview}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              style={{ containerStyle: { width: '100%', height: '100%' } }}
            />
          ) : (
            <img
              src={croppedImage || file.preview}
              className="w-full"
              alt="image preview"
            />
          )}
        </div>
      </div>
    );
  }
);

MemePreview.displayName = 'MemePreview';
export default MemePreview;
