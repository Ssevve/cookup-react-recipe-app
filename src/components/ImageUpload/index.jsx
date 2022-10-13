export default function ImageUpload({ image, setRecipe }) {
  function handleChange(e) {
    setRecipe((recipe) => {
      return { ...recipe, image: URL.createObjectURL(e.target.files[0]) };
    });
  }

  return (
    <div>
      <input type="file" onChange={(e) => handleChange(e)} />
      <img src={image} alt="" />
    </div>
  );
}
