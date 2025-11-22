export default function QuantityCounter({
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  id,
  mode,
}) {
  return (
    <div className="ProductQuantityDiv">
      <button onClick={() => handleRemoveQuantity(id, mode)}>-</button>
      <span>{productQuantity}</span>
      <button onClick={() => handleAddQuantity(id, mode)}>+</button>
    </div>
  );
}