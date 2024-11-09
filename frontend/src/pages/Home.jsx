import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../utilities/commonUtils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdateProductModal from "../components/UpdateDialog";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.allProducts) || [];
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await getProducts(dispatch);
    };
    fetchProducts();
  }, [dispatch]);

  console.log("product", products);

  const handleCreateProduct = () => {
    navigate('/create');
  };

  const handleDelete = async (productId) => {
    try {
        await deleteProduct(productId, dispatch);
        setOpenSnackbar(true);
        console.log('Product deleted:', productId);
    } catch (error) {
        console.error('Failed to delete product:', error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      {products.length === 0 ? (
        // Display message and button if no products
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h4" gutterBottom>
            No Products Available
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            You can create a new product to start listing items.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateProduct}
          >
            Create Product
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{ textAlign: "center", py: 8, backgroundColor: "secondary" }}
          >
            <Typography variant="h2" gutterBottom>
              Welcome to Our Store!
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Discover amazing products at unbeatable prices.
            </Typography>
            <Button variant="contained" color="secondary" size="large">
              Shop Now
            </Button>
          </Box>
          {/* Featured Products */}
          <Typography variant="h4" sx={{ mt: 6, mb: 3, textAlign: "center" }}>
            Featured Products
          </Typography>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => handleDelete(product._id)}>
                      Delete
                    </Button>
                    <Button size="small" color="secondary" onClick={() => openModal(product)}>
                      Update
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            {selectedProduct && (
            <UpdateProductModal
              product={selectedProduct}
              open={isModalOpen}
              onClose={closeModal}
            />
      )}
          </Grid>

          {/* Customer Reviews */}

          {/* Newsletter Subscription */}
          <Box
            sx={{
              mt: 8,
              py: 4,
              backgroundColor: "primary.light",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Subscribe to Our Newsletter
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              sx={{ mr: 2, width: "300px" }}
            />
            <Button variant="contained" color="primary">
              Subscribe
            </Button>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              py: 4,
              mt: 6,
              backgroundColor: "grey.800",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="body2">
              © 2024 My E-Commerce Site. All Rights Reserved.
            </Typography>
          </Box>
        </>
      )}
      <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={"Product deleted successfully!"}
        />
    </Container>
  );
};
