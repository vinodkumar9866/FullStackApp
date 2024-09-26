import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";
import PopupModal from "./common/modal";
import { StoreState } from "./store/store";
import { IProduct } from "./interfaces/product";
import { useNavigate } from "react-router-dom";

interface IProductCardsProps {
  products: IProduct[];
  addToCartCart: (productId: string) => void;
}
const ProductCards = ({ products, addToCartCart }: IProductCardsProps) => {
  const cartProducts = useSelector((state: StoreState) => state.cart);
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IProduct>({} as IProduct);
  const navigate = useNavigate();

  const addToCart = (productItem: IProduct) => {
    console.log(cartProducts, productItem);
    addToCartCart(productItem._id);
  };
  const handleSelected = (product: IProduct) => {
    setSelectedItem(product);
    setModalShow(true);
  };
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        {products.length > 0 &&
          products?.map((product, index) => (
            <div
              className="col-md-3"
              style={{ marginBottom: "40px" }}
              key={product.id || index}
            >
              <Card style={{ width: "18rem" }} className="h-100">
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
                <Card.Footer
                  style={{
                    background: "white",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {cartProducts.data.some(
                    (item) => item._id === product._id
                  ) ? (
                    <Button
                      variant="success"
                      onClick={() => {
                        navigate("/cart");
                      }}
                    >
                      Go to Cart
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => addToCart(product)}
                    >
                      Add To Cart
                    </Button>
                  )}
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
