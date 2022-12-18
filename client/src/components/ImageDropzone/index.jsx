/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsTrash2 } from 'react-icons/bs';
import { useDropzone } from 'react-dropzone';

import styles from './imageDropzone.module.css';

export default function ImageDropzone({
  images, setImages, files, setFiles,
}) {
  const {
    getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject,
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file),
        })),
      ]);
      console.log(files);
    },
  });

  const deleteImage = (target) => {
    if (files.includes(target)) {
      const newFiles = [...files];
      newFiles.splice(newFiles.indexOf(target), 1);
      setFiles(newFiles);
    }

    if (images.includes(target)) {
      const changedOldImages = [...images];
      changedOldImages.splice(changedOldImages.indexOf(target), 1);
      setImages(changedOldImages);
    }
  };

  const allImages = [...images, ...files];
  const thumbs = allImages.map((image, index) => (
    <div className={styles.thumb} key={`${image.name + index}`}>
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

ImageDropzone.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})),
  setImages: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({})),
  setFiles: PropTypes.func.isRequired,
};

ImageDropzone.defaultProps = {
  images: [],
  files: [],
};
