import { useState, useEffect } from "react";
import axios from "axios";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import ProductForm from "./ProductForm";
import { useForm } from "react-hook-form";

export default function GroceriesAppContainer() {
  // States
  const [products, setProductsData] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    price: "",
    image: ""
  });
  const [postResponse, setPostResponse] = useState("");

  // Fetch products
  useEffect(() => {
    handleProductsDB();
  }, []);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get products from database
  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");     
      setProductsData(response.data);
      
      const initialQuantities = response.data.map(product => ({
        id: product._id,
        quantity: 0
      }));
      setProductQuantity(initialQuantities);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle form changes
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleOnSubmit = async (data) => {
    try {
      if (isEditing) {
        await handleUpdate(formData._id);
      } else {
        await axios.post("http://localhost:3000/add-products", formData);
        setPostResponse("Product added successfully");
      }
      setFormData({ productName: "", brand: "", price: "", image: "" });
      setIsEditing(false);
      handleProductsDB();
    } catch (error) {
      console.log("Error:", error.message);
      setPostResponse("Error occurred");
    }
  };
  
  // Handle form edits
  const handleEdit = (product) => {
    setIsEditing(true);
    setFormData({
      _id: product._id,
      productName: product.productName,
      brand: product.brand,
      price: product.price,
      image: product.image
    });
  };

  // Handle product update
  const handleUpdate = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/products/${id}`, formData);
      setPostResponse("Product updated successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  
  // Handle deleting a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setPostResponse("Product deleted successfully");
      handleProductsDB();
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle adding quanity on card
  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
    } else {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
    }
  };

  // Handle removing quantity on card
  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
    } else {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
    }
  };

  // Handle adding to cart
  const handleAddToCart = (productId) => {
    const product = products.find((product) => product._id === productId);
    const pQuantity = productQuantity.find((product) => product.id === productId);
    
    if (!product || !pQuantity) return;
    
    const newCartList = [...cartList];
    const productInCart = newCartList.find((product) => product.id === productId);
    
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ 
        ...product, 
        id: productId,
        quantity: pQuantity.quantity 
      });
    }
    setCartList(newCartList);
  };

  // Handle removing from cart
  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  // Handle clearing cart
  const handleClearCart = () => {
    setCartList([]);
  };

  return (
    <div>
      <NavBar quantity={cartList.length} />
      <ProductForm 
        isEditing={isEditing}
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        setFormData={setFormData}
        setIsEditing={setIsEditing}
      />
      <div className="GroceriesApp-Container">
        <ProductsContainer
          products={products}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={productQuantity}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}