import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  product,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,         
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="ProductCard">
      <h3>{product.productName}</h3>
      <img src={product.image} alt={product.productName} />
      <h4>{product.brand}</h4>
      <QuantityCounter
        handleAddQuantity={handleAddQuantity}
        productQuantity={productQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={product._id}
        mode="product"
      />
      <h3>{product.price}</h3>
      <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
      <button onClick={() => handleDelete(product._id)}>Delete</button>
      <button onClick={() => handleEdit(product)}>Edit</button>
    </div>
  );
}