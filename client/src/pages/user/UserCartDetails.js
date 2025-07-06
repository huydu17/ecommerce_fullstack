import { useState, useEffect } from "react";
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
  const [error, setError] = useState(false);
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
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subTotal = useSelector((state) => state.cart.cartSubtotal);
  const itemsCount = useSelector((state) => state.cart.itemsCount);

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

  const orderPayload = {
    shippingAddress: shippingAddress,
    orderTotal: {
      itemsCount: itemsCount,
      cartSubtotal: subTotal,
    },
    cartItems: cartItems.map((item) => {
      return {
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      };
    }),
    paymentMethod: typePay,
  };
  const initial = {
    clientId:
      "AScFQKrkwIEl_ARqMlCT0QdwnCZmDy53SDD8y83cdIGUTXTxnG6DlU3ii2smyB035Y3YakffOpp988AP",
    currency: "USD",
    components: "buttons",
  };

  const createNewOrder = async () => {
    try {
      const response = await createOrder(orderPayload);
      if (response.error) {
        setError(true);
        setValidated(true);
        setError(false);
      } else {
        navigate(`/user/order-confirmation/${response.data._id}`);
        dispatch(completeOrder());
        SuccessToast(response.message);
      }
    } catch (err) {
      console.log(err);
      alert("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (typePay === "ONLINE" && !paypalLoaded) {
      loadScript(initial)
        .then((paypal) => {
          if (paypal) {
            setPaypalLoaded(true);
            paypal
              .Buttons({
                createOrder: (data, actions) => {
                  const usdAmount = (subTotal / 23000).toFixed(2);
                  const items = cartItems.map((item) => {
                    const itemUsdPrice = (item.price / 23000).toFixed(2);
                    return {
                      name: item.name,
                      unit_amount: {
                        currency_code: "USD",
                        value: itemUsdPrice,
                      },
                      quantity: item.quantity,
                    };
                  });
                  const itemTotal = items
                    .reduce((sum, item) => {
                      return (
                        sum + parseFloat(item.unit_amount.value) * item.quantity
                      );
                    }, 0)
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
                          },
                        },
                        items: items,
                      },
                    ],
                  });
                },
                onApprove: async (data, actions) => {
                  try {
                    const result = await actions.order.capture();
                    const transaction =
                      result.purchase_units[0].payments.captures[0];

                    if (transaction.status === "COMPLETED") {
                      await createNewOrder();
                    } else {
                      throw new Error("Thanh toán không thành công");
                    }
                  } catch (error) {
                    console.error("Payment error:", error);
                    alert(
                      "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại."
                    );
                  }
                },
                onError: (err) => {
                  console.error("PayPal error", err);
                },
                onCancel: (data) => {
                  console.log("Payment cancelled", data);
                },
              })
              .render("#paypal-container-element")
              .catch((error) => {
                console.error("Failed to render PayPal Buttons", error);
                alert(
                  "Không thể hiển thị nút thanh toán PayPal. Vui lòng làm mới trang."
                );
              });
          }
        })
        .catch((error) => {
          console.error("Failed to load PayPal SDK", error);
          alert("Không thể tải PayPal. Vui lòng làm mới trang.");
        });
    }
  }, [typePay, cartItems, subTotal, paypalLoaded]);

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
    event.stopPropagation();
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() && !phoneNumberError) {
      if (typePay === "COD") {
        try {
          const response = await createOrder(orderPayload);
          if (response.error) {
            setError(true);
            setValidated(true);
            setTimeout(() => {
              setError(false);
            }, 2000);
          } else {
            navigate(`/user/order-confirmation/${response.data._id}`);
            dispatch(completeOrder());
            SuccessToast(response.message);
          }
        } catch (error) {
          console.error("Error creating order:", error);
        }
      }
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
                  {error && (
                    <Alert variant="danger">
                      Vui lòng nhập đầu đủ thông tin
                    </Alert>
                  )}
                  <ShippingAddressForm
                    shippingAddress={shippingAddress}
                    onChange={onChange}
                    handlePhoneNumberChange={handlePhoneNumberChange}
                    phoneNumberError={phoneNumberError}
                    validated={validated}
                  />
                </Col>
                <Col md={5}>
                  <Card className="p-4">
                    <OrderSummary cartItems={cartItems} subTotal={subTotal} />
                    <PaymentOptions setTypePay={setTypePay} />
                    {typePay === "COD" ? (
                      <Button variant="info" className="mt-3" type="submit">
                        Đặt hàng
                      </Button>
                    ) : (
                      <div className="pt-2" id="paypal-container-element"></div>
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
