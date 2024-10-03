import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { IProduct } from "./interfaces/product";
import { StoreState } from "./store/store";
import { useEffect } from "react";
import { axiosRequest } from "./utils/axios";
import { addCartItems } from "./store/CartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const cartProducts = useSelector((state: StoreState) => state.cart);
  const dispatch = useDispatch();
  const userId = "66cb64834cd2f69cf922c819";

  useEffect(() => {
    fetchUserCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeProductFromCart = async (id: string) => {
    axiosRequest("delete", `/deleteCartItem/${userId}/${id}`).then(
      (response) => {
        toast.success(response.message);
        fetchUserCart();
      }
    );
  };

  const fetchUserCart = async () => {
    axiosRequest("get", `/cartItems/${userId}`).then((response) => {
      dispatch(addCartItems(response.data));
    });
  };
  const removeFromCart = (id: string) => {
    removeProductFromCart(id);
  };
  return (
    <div>
      <h2 style={{ padding: "2rem" }}>Cart</h2>
      <div className="row justify-content-md-center pl-10">
        {cartProducts.data.length
          ? cartProducts.data.map((product: IProduct, index: number) => (
              <div
                className="col-md-3"
                style={{ marginBottom: "40px" }}
                key={product.id || index}
              >
                <Card
                  style={{ width: "18rem", margin: "0 0.75rem" }}
                  className="h-100"
                >
                  <div className="flex justify-center">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{ height: 160, width: 150, padding: 20 }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>INR. {product.price}</Card.Text>
                  </Card.Body>
                  <Card.Footer style={{ background: "white", display: "flex" }}>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(product._id)}
                    >
                      Remove Item
                    </Button>
                    <Button
                      variant="warning"
                      style={{
                        textAlign: "center",
                        alignItems: "center",
                        display: "flex",
                        marginLeft: "auto",
                      }}
                    >
                      Buy Now
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            ))
          : "Your Cart is EMPTY!!!"}
      </div>
    </div>
  );
};

export default Cart;
