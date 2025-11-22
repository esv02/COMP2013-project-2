export default function ProductForm({
  isEditing,
  formData,
  handleOnChange,
  handleOnSubmit,
  handleSubmit,
  register,
  errors,
  setFormData,
  setIsEditing,
}) {
  return (
    <div className="product-form">
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
          <input
            type="text"
            name="productName"
            {...(isEditing
              ? {}
              : register("productName", {
                  required: "Name is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Name should contain only letters",
                  },
                }))}
            value={formData.productName}
            onChange={handleOnChange}
            placeholder="Product Name"
          />
          {errors.productName && (
            <span style={{ color: "red" }}>{errors.productName.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="brand"
            {...(isEditing
              ? {}
              : register("brand", {
                  required: "Brand is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Brand should contain only letters",
                  },
                }))}
            value={formData.brand}
            onChange={handleOnChange}
            placeholder="Brand"
          />
          {errors.brand && (
            <span style={{ color: "red" }}>{errors.brand.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="price"
            {...(isEditing
              ? {}
              : register("price", {
                  required: "Price is required",
                  pattern: {
                    value: /^\$+[0-9]+\.+[0-9]{2}$/,
                    message: "Price should start with $ with a valid amount",
                  },
                }))}
            value={formData.price}
            onChange={handleOnChange}
            placeholder="Price ($0.00)"
          />
          {errors.price && (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="image"
            {...(isEditing
              ? {}
              : register("image", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                    message: "Invalid URL",
                  },
                }))}
            value={formData.image}
            onChange={handleOnChange}
            placeholder="Image URL"
          />
          {errors.image && (
            <span style={{ color: "red" }}>{errors.image.message}</span>
          )}
        </div>
        <button type="submit" style={{ marginTop: "10px", padding: "10px" }}>
          {isEditing ? "Update Product" : "Add Product"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setFormData({
                productName: "",
                brand: "",
                price: "",
                image: "",
              });
              setIsEditing(false);
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}