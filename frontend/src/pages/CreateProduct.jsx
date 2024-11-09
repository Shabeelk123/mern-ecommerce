import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
} from "@mui/material";
import { createProduct } from "../utilities/commonUtils";
import { useDispatch } from "react-redux";
import { setProducts } from "../store/productSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [notification, setNotification] = useState({ success: false, message: ''});

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    try {
      const res = await createProduct(product);
      if (res.success === true) {
        dispatch(setProducts(res.data));
        setNotification({
            success: true,
            message: 'Product created succesfully.'
        });
      } else {
        setNotification({
            success: false,
            message: res.message
        });
      }
    } catch (error) {
      console.log(error);
      setNotification({
        success: false,
        message: error.message
    });
    }
    setProduct({
      name: "",
      price: "",
      image: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification({success: false});
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "#f5f5f5", // Set background color
        padding: 3,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex" // Enable Flexbox for row layout
          flexDirection="column" // Arrange children in a row
          justifyContent="center" // Center-align items horizontally
          alignItems="center" // Align items vertically
          flexWrap="wrap" // Allow wrapping if there are too many items
        >
          <TextField
            label="Product Name"
            name="name"
            variant="outlined"
            margin="normal"
            value={product.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Price"
            name="price"
            variant="outlined"
            margin="normal"
            type="number"
            value={product.price}
            onChange={handleChange}
            required
          />
          <TextField
            label="Image URL"
            name="image"
            variant="outlined"
            margin="normal"
            value={product.image}
            onChange={handleChange}
            required
          />
        </Box>
        <Box style={{ textAlign: "center", marginTop: 16 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Product
          </Button>
        </Box>
      </form>
      {notification.success && (
        <Snackbar
          open={notification.success}
          autoHideDuration={4000}
          onClose={handleClose}
          message={notification.message}
        />
      )}
    </Container>
  );
};

export default CreateProduct;
