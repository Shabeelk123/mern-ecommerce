import { useState } from 'react';
import PropTypes from 'prop-types'; 
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../utilities/commonUtils';
import { setUpadteProduct } from '../store/productSlice';

const UpdateProductModal = (props) => {
  const dispatch = useDispatch();
  const { product, open, onClose } = props;
  const [productName, setProductName] = useState(product?.name || '');
  const [productPrice, setProductPrice] = useState(product?.price || 0);
  const [imageUrl, setImageUrl] = useState(product?.image || '');

  const handleUpdateProduct = async () => {
    try {
      const updatedProduct = {
        name: productName,
        price: productPrice,
        image: imageUrl
      };

      const res = await updateProduct(product._id, updatedProduct);
      dispatch(setUpadteProduct(res.data));

      onClose(); // Close modal after updating
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Product Name"
          fullWidth
          margin="normal"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <TextField
          label="Product Price"
          fullWidth
          margin="normal"
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <TextField
          label="Product ImageUrl"
          fullWidth
          margin="normal"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateProduct} variant="contained" color="primary">
          Update Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UpdateProductModal.propTypes = {
    product: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default UpdateProductModal;
