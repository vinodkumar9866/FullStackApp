import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { IProduct } from "./interfaces/product";
import { remove } from "./store/CartSlice";
import { StoreState } from "./store/store";

const Cart = () => {
  const cartProducts = useSelector((state: StoreState) => state.cart);
  const dispatch = useDispatch();
  const removeFromCart = (id: string) => {
    dispatch(remove(id));
  };
  return (
    <div>
      <h2 style={{ padding: "2rem" }}>Cart</h2>
      <div className="row justify-content-md-center">
        {cartProducts.length
          ? cartProducts.map((product: IProduct, index: number) => (
              <div
                className="col-md-3"
                style={{ marginBottom: "40px" }}
                key={product.id || index}
              >
                <Card
                  style={{ width: "18rem", margin: "0 0.75rem" }}
                  className="h-100"
                >
                  <div className="text-center">
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
                      onClick={() => removeFromCart(product.id)}
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
