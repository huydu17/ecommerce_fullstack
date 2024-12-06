import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Table, Tag } from "antd";
import { GoX } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import { LinkContainer } from "react-router-bootstrap";
import { convertToVnd } from "../../utils/ConvertToVnd";
import Loading from "../../components/Loading";
import { getAllOrders } from "../../apicalls/order";
import { formatDate, toLocaleUpperCase } from "../../utils/formatter";
import { IoEyeOutline } from "react-icons/io5";
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getAllOrders(signal);
        if (response.data) {
          const formattedOrders = response.data.map((order, index) => ({
            ...order,
            index: index + 1,
            code: toLocaleUpperCase(order.orderCode),
            createdAt: formatDate(order.createdAt),
            fullName: order.shippingAddress.fullName,
            totalPrice: convertToVnd(order.orderTotal.cartSubtotal),
          }));
          setOrders(formattedOrders);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        if (error.name === "AbortError") {
          console.error("API call aborted");
        } else {
          console.error("Error fetching products:", error);
        }
      }
    };
    fetchOrders();
    return () => {
      if (signal.aborted === false) {
        abortController.abort();
      }
    };
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      width: "3%",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      width: "7%",
    },
    {
      title: "Khách hàng",
      dataIndex: "fullName",
      width: "15%",
    },
    {
      title: "Đơn giá",
      dataIndex: "totalPrice",
      width: "10%",
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "paymentMethod",
      width: "20%",
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentStatus",
      width: "10%",
      render: (paymentStatus) =>
        paymentStatus === "Đã thanh toán" ? (
          <TiTick size={25} color="green" />
        ) : (
          <GoX size={25} color="red" />
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "10%",
      render: (status) => {
        const statusColorMap = {
          "Đang xử lý": "orange",
          "Đã xác nhận": "blue",
          "Đang vận chuyển": "purple",
          "Đã giao": "green",
        };
        return <Tag color={statusColorMap[status] || "default"}>{status}</Tag>;
      },
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      width: "15%",
    },
    {
      title: "",
      width: "10%",
      render: (text, record) => (
        <div className="flex gap-5">
          <LinkContainer to={`/admin/order-detail/${record._id}`}>
            <Button size="sm" variant="info">
              <IoEyeOutline className="text-white fw-bold" size={20} />
            </Button>
          </LinkContainer>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Card>
            <div className="p-3">
              <Table
                columns={columns}
                dataSource={orders}
                pagination={{
                  pageSize: 8,
                }}
              />
            </div>
          </Card>
        </>
      )}
    </>
  );
}

export default AdminOrders;
