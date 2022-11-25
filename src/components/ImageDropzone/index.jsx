/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsTrash2 } from 'react-icons/bs';
import { useDropzone } from 'react-dropzone';

import styles from './imageDropzone.module.css';

export default function ImageDropzone({ images, setImages }) {
  const {
    getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject,
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: (acceptedFiles) => {
      setImages([
        ...images,
        ...acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file),
        })),
      ]);
      console.log(images);
    },
  });

  const deleteImage = (image) => {
    const newImages = [...images];
    newImages.splice(newImages.indexOf(image), 1);
    setImages(newImages);
  };

  const thumbs = images.map((image) => (
    <div className={styles.thumb} key={image.name}>
      <img
        className={styles.image}
        src={image.url || image.preview}
        // Revoke data uri after image is loaded to prevent memory leaks
        onLoad={() => {
          URL.revokeObjectURL(image.preview);
        }}
        alt=""
      />
      <span className={styles.imageName}>{image.name}</span>
      <button onClick={() => deleteImage(image)} className={styles.btn} type="button">
        <BsTrash2 />
      </button>
    </div>
  ));

  return (
    <section>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} multiple />
        <AiOutlineCloudUpload size={56} color="gray" />
        {isDragAccept && <p>Drop to upload</p>}
        {isDragReject && <p>Unsupported file type</p>}
        {!isDragActive && <p>Drag and drop images here, or click to select images</p>}
      </div>
      <div className={styles.preview}>{thumbs}</div>
    </section>
  );
}
