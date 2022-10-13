export default function ImageUpload({ image, setImage }) {
  function handleChange(e) {
    setImage({ preview: URL.createObjectURL(e.target.files[0]), data: e.target.files[0] });
  }

  return (
    <div>
      <input type="file" onChange={(e) => handleChange(e)} />
      <img
        src={image.preview || 'https://imgs.search.brave.com/lzU2qftfabnreLPjEn36tNM7Mj6koROCIu92-R_kY9E/rs:fit:720:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5o/dEZLMlB6YzFYcGcy/M1B3aV9mZXpRSGFF/NCZwaWQ9QXBp'}
        alt=""
      />
    </div>
  );
}
