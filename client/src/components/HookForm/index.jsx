import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DropzoneInput from "../Drop";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/slices/productSlice";

function HookForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState([]);
  const [clearTrigger, setClearTrigger] = useState(false);

  const onSubmitData = (data) => {
    const formData = new FormData();

    // Додаємо текстові поля (name, description, price і т.д.)
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Додаємо файли як "images"
    files.forEach((file) => {
      formData.append("images", file);
    });

    dispatch(createProduct(formData));

    // Очищення форми
    reset();
    setFiles([]);
    setClearTrigger(prev => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitData)}>
      <input
        type="text"
        {...register("name", { required: "Name обов'язкове" })}
        placeholder="Name"
      />
      {errors.test && <p>{errors.test.message}</p>}

      <input
        type="text"
        {...register("description")}
        placeholder="Description"
      />

      <input
        type="number"
        {...register("price")}
        placeholder="Price"
      />

      {/* Dropzone */}
      <DropzoneInput onFilesChange={setFiles} clearFilesTrigger={clearTrigger}/>

      <button type="submit">Надіслати</button>
    </form>
  );
}

export default HookForm;
