/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import MemePreview from './MemePreview';
import MemeEditor from './MemeEditor';
import useTextBoxConext from '@/hooks/useTextBoxContext';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

export type ImageFile = File & { preview: string };

const MemeCreator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { TextBoxContext, value } = useTextBoxConext();
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [initiateCrop, setInitiateCrop] = useState(false);
  const [rotation, setRotation] = useState(0);
  const childRef = useRef<any>(null);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setIsLoading(true);
      if (acceptedFiles.length > 0) {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        setIsLoading(false);
      }
    },
  });

  const downloadImage = async () => {
    const el = document.getElementById('meme-canvas');
    if (el) {
      const canvas = await html2canvas(el, {
        backgroundColor: 'none',
        logging: true,
        useCORS: true,
      });
      const image = canvas.toDataURL('image/png', 1.0);

      saveAs(image, 'generated-meme.png');
    }
  };
  const handleSaveEdits = () => {
    if (initiateCrop) {
      childRef.current?.saveEdits();
    }
    setInitiateCrop(!initiateCrop);
  };
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <TextBoxContext.Provider value={value}>
      <section className="flex justify-between flex-col lg:flex-row">
        <div>
          <div className="lg:min-w-[600px] max-w-[600px] relative border-dashed border-2 rounded flex items-center justify-center h-[400px]">
            {files.length > 0 ? (
              <div className="w-full h-full">
                <MemePreview
                  file={files[0]}
                  initiateCrop={initiateCrop}
                  ref={childRef}
                  rotation={rotation}
                  setRotation={setRotation}
                />
              </div>
            ) : (
              <div className="w-full h-full">
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <div
                    {...getRootProps({
                      className:
                        'dropzone p-3 py-10 w-full h-full items-center justify-center flex hover:bg-gray-100 cursor-pointer',
                    })}
                  >
                    <input {...getInputProps()} onDrop={() => {}} />
                    <div className="max-w-[400px] p-4">
                      <div>
                        <h3 className="text-md font-bold">
                          Guide on how you would create a meme!
                        </h3>
                      </div>
                      <ul className="text-sm list-disc ml-4 text-gray-500">
                        <li className="mt-3">
                          Drag and drop an image here, or click to select an
                          image
                        </li>
                        <li className="mt-2">
                          On the right hand side on each text box (you can add
                          as many as you want), where you can write your text,
                          choose color and set font size
                        </li>
                        <li className="mt-2">
                          You can drag your text box to a position of your
                          choice
                        </li>
                        <li className="mt-2">
                          After you are done, click save image to download your
                          meme with your adjustments
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {files.length > 0 && (
            <div className="mt-3 flex items-center justify-between lg:min-w-[600px] max-w-[600px]">
              <div className="flex items-center">
                {initiateCrop ? null : (
                  <button
                    className="rounded border-gray-100 bg-red-600 text-white p-2 text-sm"
                    onClick={() => setFiles([])}
                    disabled={initiateCrop}
                  >
                    Start Over
                  </button>
                )}
                <button
                  className="rounded border-gray-100 bg-green-600 text-white p-2 text-sm ml-5"
                  onClick={handleSaveEdits}
                  style={{ marginLeft: initiateCrop ? '0px' : '1.25rem' }}
                >
                  {initiateCrop ? 'Save Edits' : 'Edit Image'}
                </button>
                {initiateCrop ? (
                  <div className="flex items-center">
                    <button
                      className="rounded border-gray-100 bg-gray-200 text-black p-2 text-sm ml-5"
                      onClick={() => setInitiateCrop(!initiateCrop)}
                    >
                      Cancel Edit
                    </button>

                    <div className="flex items-center ml-3">
                      <label htmlFor="rotation">Rotation</label>
                      <input
                        id="rotation"
                        className="ml-2 max-w-[80px]"
                        type="range"
                        value={rotation}
                        min={0}
                        max={360}
                        step={1}
                        aria-labelledby="Rotation"
                        onChange={(e) => setRotation(Number(e.target.value))}
                      />
                    </div>
                  </div>
                ) : null}
              </div>

              {initiateCrop ? null : (
                <button
                  className="rounded border-gray-100 bg-blue-500 text-white p-2 text-sm"
                  onClick={downloadImage}
                  disabled={initiateCrop}
                >
                  Save Image
                </button>
              )}
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div className="lg:min-w-[500px] mt-10 lg:mt-0">
            <MemeEditor />
          </div>
        )}
      </section>
    </TextBoxContext.Provider>
  );
};

export default MemeCreator;
