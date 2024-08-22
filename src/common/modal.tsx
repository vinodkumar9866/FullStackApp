import { Button, Card, Modal } from "react-bootstrap";
import { RatingStar } from "./Rating";
import { IProduct } from "../interfaces/product";

interface IPopupModal {
  show: boolean;
  productItem: IProduct;
  onHide: () => void;
}
const PopupModal = ({ show, productItem, onHide }: IPopupModal) => {
  console.log(productItem);
  return (
    <Modal
      show={show}
      onHide={onHide}
      className={"!width-[25rem]"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {productItem?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="text-center">
          <div className="flex flex-col items-center">
            <Card.Img
              variant="top"
              src={productItem?.image}
              style={{ height: 260, width: 250, padding: 20 }}
            />
            <div>
              <h4>{`₹${productItem?.price}`}</h4>
              <p className="ml-auto flex items-center">
                <RatingStar rating={productItem?.rating?.rate} />
                {`(${productItem?.rating?.count})`}
              </p>
            </div>
          </div>
        </Card>
        <h4>{productItem?.category}</h4>
        <p>{productItem?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupModal;
