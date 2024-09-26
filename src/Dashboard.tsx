import { useEffect } from "react";
import ProductCards from "./ProductCards";
import { addProducts } from "./store/productSlice";
import { StoreState } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { axiosRequest } from "./utils/axios";
import { addCartItems } from "./store/CartSlice";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { data: products } = useSelector((state: StoreState) => state.products);
  const dispatch = useDispatch();
  const userId = "66cb64834cd2f69cf922c819";

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUserCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserCart = async () => {
    axiosRequest("get", `/cartItems/${userId}`).then((response) => {
      dispatch(addCartItems(response.data));
    });
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  const fetchProducts = async () => {
    axiosRequest("get", "/products").then((response) => {
      dispatch(addProducts(response.data));
    });
  };

  const addToCartCart = (productId: string) => {
    axiosRequest("post", `/addToCart/${userId}/${productId}`).then(
      (response) => {
        toast.success(response.message);
        fetchUserCart();
      }
    );
  };

  return (
    <div>
      <h2 style={{ padding: "2rem" }}>Products Dashboard</h2>

      <ProductCards addToCartCart={addToCartCart} products={products} />
    </div>
  );
};

export default Dashboard;
