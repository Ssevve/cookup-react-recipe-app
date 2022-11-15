/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useDropzone } from 'react-dropzone';

import styles from './imageDropzone.module.css';

export default function ImageDropzone() {
  const {
    getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject,
  } = useDropzone({
    maxFiles: 1,
    accept: 'image/*',
  });
  return (
    <section>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <AiOutlineCloudUpload size={56} color="gray" />
        {isDragAccept && <p>Drop to upload</p>}
        {isDragReject && <p>Wrong file format</p>}
        {!isDragActive && <p>Drag and drop image here, or click to select an image</p>}
      </div>
    </section>
  );
}
