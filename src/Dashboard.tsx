import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { getProducts } from "./store/productSlice";
import { statusCodes } from "./utils/statusCodes";
import ProductCards from "./ProductCards";
import { AppDispatch, StoreState } from "./store/store";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: products, status } = useSelector(
    (state: StoreState) => state.products
  );
  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (status === statusCodes.LOADING) {
    return <h2>loading...</h2>;
  }
  if (status === statusCodes.ERROR) {
    return (
      <Alert key={"danger"} variant="danger">
        Something went wrong! Try again later!
      </Alert>
    );
  }
  return (
    <div>
      <h2 style={{ padding: "2rem" }}>Products Dashboard</h2>

      <ProductCards products={products} />
    </div>
  );
};

export default Dashboard;
