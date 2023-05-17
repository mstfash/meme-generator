/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import MemePreview from './MemePreview';
import MemeEditor from './MemeEditor';
import useTextBoxConext from '@/hooks/useTextBoxContext';

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
              <p>Drag number drop some files here, or click to select files</p>
            </div>
            {files.length > 0 && (
              <div className="mt-16">
                <MemePreview file={files[0]} />
              </div>
            )}
          </div>
          {files.length > 0 && (
            <div className="mt-3 flex items-center justify-between">
              <button
                className="rounded border-gray-100 bg-red-600 text-white p-2 text-sm"
                onClick={() => setFiles([])}
              >
                Start Over
              </button>
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div className="lg:min-w-[500px] mt-5 lg:mt-0">
            <MemeEditor />
          </div>
        )}
      </section>
    </TextBoxContext.Provider>
  );
};

export default MemeCreator;
