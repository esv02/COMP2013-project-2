import ProductCard from "./ProductCard";

export default function ProductsContainer({
  products,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  productQuantity,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="ProductsContainer">
      {products.map((product) => {
        const quantityObj = productQuantity.find((p) => p.id === product._id);
        const quantity = quantityObj ? quantityObj.quantity : 0;
        
        return (
          <ProductCard
            key={product._id}
            product={product}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            productQuantity={quantity}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}