import { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { validatePhoneNumber } from "../../utils/validation";
import ShippingAddressForm from "../../components/user/ShippingAddressForm";
import OrderSummary from "../../components/user/OrderSummary";
import PaymentOptions from "../../components/user/PaymentOptions";
import { loadScript } from "@paypal/paypal-js";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../apicalls/order";
import SuccessToast from "../../components/common/SuccessToast";
import Breadcrumb from "../../components/common/Breadcrumb";
import BackButton from "../../components/common/BackButton";
import { completeOrder } from "../../redux/slices/cartSlice";

function UserCartDetails() {
  const dispatch = useDispatch();
  const [typePay, setTypePay] = useState("COD");
  const [validated, setValidated] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phoneNumber: "",
    apartment: "",
    ward: "",
    district: "",
    province: "",
    note: "",
  });
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const paypalButtonsRef = useRef(null);

  const userInfo = useSelector((state) => state.user.userInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subTotal = useSelector((state) => state.cart.cartSubtotal);
  const itemsCount = useSelector((state) => state.cart.itemsCount);

  useEffect(() => {
    const isValid = Boolean(
      shippingAddress.fullName &&
        !phoneNumberError &&
        shippingAddress.phoneNumber &&
        shippingAddress.apartment &&
        shippingAddress.ward &&
        shippingAddress.district &&
        shippingAddress.province
    );
    setFormIsValid(isValid);
  }, [shippingAddress, phoneNumberError]);

  useEffect(() => {
    if (userInfo?.ward && userInfo?.apartment) {
      setShippingAddress({
        fullName: `${userInfo.firstName || ""} ${userInfo.lastName || ""}`,
        phoneNumber: userInfo.phoneNumber || "",
        apartment: userInfo.apartment,
        ward: userInfo.ward,
        district: userInfo.district,
        province: userInfo.province,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (typePay === "ONLINE" && formIsValid) {
      const initializePayPal = async () => {
        try {
          if (paypalButtonsRef.current) {
            paypalButtonsRef.current.innerHTML = "";
          }
          const paypal = await loadScript({
            clientId:
              "Aex7h7nCe4QzY6dTJgVyRm09mrwhFru5fwFFeFcZXbWSQoz4QQspT2xqaZjihwycrWBzx1uiRQvDSpiu",
            currency: "USD",
            components: "buttons",
          });
          paypal
            .Buttons({
              createOrder: (data, actions) => {
                const usdAmount = (subTotal / 23000).toFixed(2);
                const items = cartItems.map((item) => ({
                  name: item.name,
                  unit_amount: {
                    currency_code: "USD",
                    value: (item.price / 23000).toFixed(2),
                  },
                  quantity: item.quantity,
                }));
                const itemTotal = items
                  .reduce(
                    (sum, item) =>
                      sum + parseFloat(item.unit_amount.value) * item.quantity,
                    0
                  )
                  .toFixed(2);
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: usdAmount,
                        breakdown: {
                          item_total: {
                            currency_code: "USD",
                            value: itemTotal,
                          },
                          shipping: {
                            currency_code: "USD",
                            value: "0.00",
                          },
                          tax_total: {
                            currency_code: "USD",
                            value: "0.00",
                          },
                          handling: {
                            currency_code: "USD",
                            value: "0.00",
                          },
                          insurance: {
                            currency_code: "USD",
                            value: "0.00",
                          },
                          shipping_discount: {
                            currency_code: "USD",
                            value: "0.00",
                          },
                          discount: {
                            currency_code: "USD",
                            value: "0.00",
                          },
                        },
                      },
                      items: items,
                    },
                  ],
                });
              },
              onApprove: async (data, actions) => {
                try {
                  await actions.order.capture();
                  await createNewOrder();
                } catch (error) {
                  console.error("Payment error:", error);
                  alert("Thanh toán không thành công. Vui lòng thử lại.");
                }
              },
              onError: (err) => {
                alert("PayPal error", err);
              },
            })
            .render(paypalButtonsRef.current);
        } catch (error) {
          console.error("Failed to load PayPal", error);
        }
      };
      initializePayPal();
    }
  }, [typePay, formIsValid, cartItems, subTotal]);

  const orderPayload = {
    shippingAddress: shippingAddress,
    orderTotal: {
      itemsCount: itemsCount,
      cartSubtotal: subTotal,
    },
    cartItems: cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    })),
    paymentMethod: typePay,
  };

  const createNewOrder = async () => {
    try {
      const response = await createOrder(orderPayload);
      if (response.error) {
        setError(response.error);
      } else {
        navigate(`/user/order-confirmation/${response.data._id}`);
        dispatch(completeOrder());
        SuccessToast(response.message);
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
    }
  };

  const handlePhoneNumberChange = (event) => {
    setShippingAddress({
      ...shippingAddress,
      [event.target.name]: event.target.value,
    });
    setPhoneNumberError(validatePhoneNumber(event.target.value));
  };

  const onChange = (event) => {
    setShippingAddress({
      ...shippingAddress,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    if (typePay === "COD" && formIsValid) {
      await createNewOrder();
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { home: true },
          { label: "Giỏ hàng", link: "/cart" },
          { label: "Thanh toán" },
        ]}
      />
      <Container>
        <div className="pt-2 mb-0">
          <BackButton />
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Card>
            <div className="p-4 max-w-6xl mx-auto">
              <Row className="p-3">
                <Col md={7}>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <ShippingAddressForm
                    shippingAddress={shippingAddress}
                    onChange={onChange}
                    handlePhoneNumberChange={handlePhoneNumberChange}
                    phoneNumberError={phoneNumberError}
                    validated={validated}
                  />
                </Col>
                <Col md={5}>
                  <Card className="p-4" style={{ width: "100%" }}>
                    <OrderSummary cartItems={cartItems} subTotal={subTotal} />
                    <PaymentOptions setTypePay={setTypePay} />
                    {typePay === "COD" ? (
                      <Button variant="info" className="mt-3" type="submit">
                        Đặt hàng
                      </Button>
                    ) : (
                      <>
                        {typePay === "ONLINE" && formIsValid && (
                          <div ref={paypalButtonsRef} className="pt-2" />
                        )}
                        {typePay === "ONLINE" && !formIsValid && (
                          <Alert variant="danger" className="mt-3">
                            Vui lòng điền đầy đủ thông tin!
                          </Alert>
                        )}
                      </>
                    )}
                  </Card>
                </Col>
              </Row>
            </div>
          </Card>
        </Form>
      </Container>
    </>
  );
}

export default UserCartDetails;
