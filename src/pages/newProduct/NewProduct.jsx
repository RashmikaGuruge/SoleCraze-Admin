import { useState } from "react";
import "./newProduct.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from './../../utils/newRequest.js';
import upload from "../../utils/upload.js";
import { useNavigate } from 'react-router-dom';

export default function NewProduct() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [color, setColor] = useState('');
  const [size, setSelectedSizes] = useState([]);
  const [brand, setBrand] = useState('');
  const [cover, setCover] = useState(undefined);
  const [imgs, setImgs] = useState([]);
  const [cat, setCat] = useState('men');
  const [stock, setStock] = useState('');
  const [status, setActive] = useState('active');
  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setSize = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedSizes(selectedOptions);
  };

  const handleCatChange = (e) => {
    setCat(e.target.value);
  };

  const handleActiveChange = (e) => {
    setActive(e.target.value);
  };

  console.log(cover)

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      console.log('Uploading cover image...');
      const coverImg = await upload(cover);
      console.log('Cover image uploaded successfully:', coverImg);
  
      const images = await Promise.all(
        [...imgs].map(async (img) => {
          console.log('Uploading image...', img.name);
          const url = await upload(img);
          console.log('Image uploaded successfully:', url);
          return url;
        })
      );
      setUploading(false);
  
      setCover(coverImg);
      setImgs(images);
      console.log('All images uploaded successfully.');
  
    } catch (err) {
      console.error('Error uploading images:', err);
      setUploading(false);
    }
  };
  

  const mutation = useMutation({
    mutationFn: (product) => {
      return newRequest.post("/products", product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleProductSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({title, desc, price, cost, color, size, brand, stock, status, cat, cover, imgs});

    setTitle('');
    setDesc('');
    setPrice('');
    setCost('');
    setCat('');
    setColor('');
    setSelectedSizes([]);
    setBrand('');
    setStock('');
    setActive('');
    setCover(undefined);
    setImgs([]);
    
    navigate("/products");
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="formContainer">
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number" onChange={(e) => setPrice(e.target.value)}/>
        </div>
        <div className="addProductItem">
          <label>Cost</label>
          <input type="number" onChange={(e) => setCost(e.target.value)}/>
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" onChange={(e) => setColor(e.target.value)}/>
        </div>
        <div className="addProductItem">
          <label>Brand</label>
          <input type="text" onChange={(e) => setBrand(e.target.value)}/>
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <select name="size" id="size" multiple onChange={setSize} value={size}>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input type="text"  onChange={(e) => setStock(e.target.value)}/>
        </div>
        <div className="uploadContainer">
        <div className="addProductItem">
          <label>Cover</label>
          <input type="file" onChange={(e) => setCover(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Images</label>
          <input type="file" multiple onChange={(e) => setImgs(e.target.files)}/>
          <button className="btnUpload" onClick={(e) => handleUpload(e)}>
                {uploading ? "uploading" : "Upload"}
        </button>
        </div>
        
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <select name="cat" id="cat" onChange={handleCatChange} value={cat}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kid</option>
          </select>
        </div>
        
        <div className="addProductItem">
          <label>Active</label>
          <select name="setactive" id="setactive" onChange={handleActiveChange} value={status}>
            <option value="active">Yes</option>
            <option value="out of stock">No</option>
          </select>
        </div>
        </div>
        <button className="addProductButton" onClick={(e) => handleProductSubmit(e)}>Create</button>
      </form>
    </div>
  );
}
