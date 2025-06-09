import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DropzoneInput from "../Drop";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/slices/productSlice";
import styles from "./HookForm.module.scss";

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

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    files.forEach((file) => {
      formData.append("images", file);
    });

    dispatch(createProduct(formData));

    reset();
    setFiles([]);
    setClearTrigger((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitData)} className={styles.coverForm}>
      <input
        type="text"
        {...register("name", { required: "Name required" })}
        placeholder="Name"
      />
      {errors.test && <p>{errors.test.message}</p>}

      <input
        type="text"
        {...register("description")}
        placeholder="Description"
      />

      <select {...register("category")}>
        <option value="">Select category...</option>
        <option value="T-SHIRT">T-SHIRT</option>
        <option value="SHIRT">SHIRT</option>
        <option value="game">JEANS</option>
      </select>

      <input type="number" {...register("price")} placeholder="Price" />

      {/* Dropzone */}
      <DropzoneInput
        onFilesChange={setFiles}
        clearFilesTrigger={clearTrigger}
      />
      <button type="submit">Надіслати</button>
    </form>
  );
}

export default HookForm;
