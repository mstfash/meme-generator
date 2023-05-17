/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import MemePreview from './MemePreview';
import MemeEditor from './MemeEditor';
import useTextBoxConext from '@/hooks/useTextBoxContext';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

export type ImageFile = File & { preview: string };

const MemeCreator = () => {
  const { TextBoxContext, value } = useTextBoxConext();
  const [files, setFiles] = useState<ImageFile[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
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

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <TextBoxContext.Provider value={value}>
      <section className="flex justify-between flex-col lg:flex-row">
        <div>
          <div className="lg:min-w-[600px] max-w-[600px] relative border-dashed border-2 rounded flex items-center justify-center h-[400px]">
            <div
              {...getRootProps({
                className:
                  'dropzone w-full h-full items-center justify-center flex hover:bg-gray-100 cursor-pointer',
              })}
            >
              <input {...getInputProps()} />
              <div className="max-w-[400px] p-4">
                <div>
                  <h3 className="text-md font-bold">
                    Guide on how you would create a meme!
                  </h3>
                </div>
                <ul className="text-sm list-disc ml-4 text-gray-500">
                  <li className="mt-3">
                    Drag and drop an image here, or click to select an image
                  </li>
                  <li className="mt-2">
                    On the right hand side on each text box (you can add as many
                    as you want), where you can write your text, choose color
                    and set font size
                  </li>
                  <li className="mt-2">
                    You can drag your text box to a position of your choice
                  </li>
                  <li className="mt-2">
                    After you are done, click save image to download your meme
                    with your adjustments
                  </li>
                </ul>
              </div>
            </div>
            {files.length > 0 && (
              <div className="mt-16">
                <MemePreview file={files[0]} />
              </div>
            )}
          </div>
          {files.length > 0 && (
            <div className="mt-3 flex items-center justify-between lg:min-w-[600px] max-w-[600px]">
              <button
                className="rounded border-gray-100 bg-red-600 text-white p-2 text-sm"
                onClick={() => setFiles([])}
              >
                Start Over
              </button>
              <button
                className="rounded border-gray-100 bg-blue-500 text-white p-2 text-sm"
                onClick={downloadImage}
              >
                Save Image
              </button>
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
