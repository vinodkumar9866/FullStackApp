import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";
import PopupModal from "./common/modal";
import { add } from "./store/CartSlice";
import { StoreState } from "./store/store";
import { IProduct } from "./interfaces/product";

interface IProductCardsProps {
  products: IProduct[];
}
const ProductCards = ({ products }: IProductCardsProps) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state: StoreState) => state.cart);
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IProduct>({} as IProduct);
  const addToCart = (product: IProduct) => {
    console.log(cartProducts, product);
    const isAlreadyInCart = cartProducts.find(
      (cartItem) => cartItem.id === product.id
    );
    !isAlreadyInCart && dispatch(add(product));
  };
  const handleSelected = (product: IProduct) => {
    setSelectedItem(product);
    setModalShow(true);
  };
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        {products.length &&
          products?.map((product, index) => (
            <div
              className="col-md-3"
              style={{ marginBottom: "40px" }}
              key={product.id || index}
            >
              <Card style={{ width: "18rem" }} className="h-100">
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
                  <Button variant="primary" onClick={() => addToCart(product)}>
                    Add To Cart
                  </Button>
                  <Button
                    variant="secondary"
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                      display: "flex",
                      marginLeft: "auto",
                    }}
                    onClick={() => handleSelected(product)}
                  >
                    <FaInfoCircle />
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          ))}
      </div>
      <PopupModal
        show={modalShow}
        productItem={selectedItem}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default ProductCards;
