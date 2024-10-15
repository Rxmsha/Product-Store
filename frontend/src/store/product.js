// Local State specific to a component
// const [state, useState] = useState([]);

// Global State; can use with any component. In this case, its coming from zustand pkg
import {create} from 'zustand';

export const useProductStore = create((set) => ({          // {} is for function; ({}) is for object
  products: [],                                            // "state"
  setProducts: (products) => set({products}),              // "useState"
  createProduct: async(newProduct) => {                    // createProduct function is from backend/controllers/product.controller.js
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {sucess:false, message:"Please fill in all fields."};
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({products:[...state.products, data.data]}));
    return {success: true, message: "Product created successfully."};
  },
  
  fetchProducts: async() => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({products: data.data});
  },

  deleteProduct: async(pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return {success: false, message: data.message};

    // updates the ui immediately after you delete product, without needing a refresh
    set(state => ({products: state.products.filter((product) => product._id !== pid)}));
    return {success: true, message: data.message};
  },

  updateProduct: async(pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return {success: false, message: data.message};

    // update the state/ui immediately after you update product, without needing a refresh
    set(state => ({
      products: state.products.map(product => product._id === pid ? data.data : product)
    }));  
    return { success: true, message: data.message };
  },
}));      


