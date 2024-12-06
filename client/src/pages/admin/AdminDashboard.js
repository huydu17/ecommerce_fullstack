import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Card, Col, Form, Row } from "react-bootstrap";
import {
  analyticForFirstDate,
  analyticForSecondDate,
  getStats,
} from "../../apicalls/order";
import { convertToVnd } from "../../utils/ConvertToVnd";
import Loading from "../../components/Loading";
import {
  FaBox,
  FaMoneyBillWave,
  FaRegUser,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
function AdminDashboard() {
  const [firstDateToCompare, setFirstDateToCompare] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const previosDay = new Date();
  previosDay.setDate(previosDay.getDate() - 1);
  const [secondDateToCompare, setSecondDateToCompare] = useState(
    new Date(previosDay).toISOString().substring(0, 10)
  );
  const handleFirstDate = (e) => {
    setFirstDateToCompare(e.target.value);
  };
  const handleSecondDate = (e) => {
    setSecondDateToCompare(e.target.value);
  };
  const [dataForFirstDate, setDataForFirstDate] = useState();
  const [dataForSecondDate, setDataForSecondDate] = useState();
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(false);
  const analysisOrder = async () => {
    try {
      const responseFirstDate = await analyticForFirstDate(firstDateToCompare);
      if (responseFirstDate.data) {
        let orderSum = 0;
        const orders = responseFirstDate.data.map((order) => {
          orderSum += order.orderTotal.cartSubtotal;
          const time = new Date(order.createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: "Asia/Ho_Chi_Minh",
          });
          return { name: time, [firstDateToCompare]: orderSum };
        });
        setDataForFirstDate(orders);
      }
      const responseSecondDate = await analyticForSecondDate(
        secondDateToCompare
      );
      if (responseSecondDate.data) {
        let orderSum = 0;
        const orders = responseSecondDate.data.map((order) => {
          orderSum += order.orderTotal.cartSubtotal;
          const time = new Date(order.createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: "Asia/Ho_Chi_Minh",
          });
          return { name: time, [secondDateToCompare]: orderSum };
        });
        setDataForSecondDate(orders);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    analysisOrder();
  }, [firstDateToCompare, secondDateToCompare]);
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getStats();
      console.log(response);
      if (response.data) {
        setStats(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);
  console.log(stats?.ordersStats);
  return (
    <>
      {loading && <Loading />}
      <h3>Dashboard</h3>
      <Row className="mb-3">
        <Col md={3}>
          <Card>
            <div className="p-3">
              <span className="fs-6 d-flex align-items-center gap-2">
                <FaMoneyBillWave className="mt-1" /> {/* Thêm icon tiền */}
                Doanh thu
              </span>
              {stats?.ordersStats?.length === 0 && (
                <p key={stats.totalRevenue} className="pt-3 fs-4 fw-bold">
                  {convertToVnd(0)}
                </p>
              )}
              {stats?.ordersStats?.map((stats) => {
                return (
                  <p key={stats.totalRevenue} className="pt-3 fs-4 fw-bold">
                    {convertToVnd(stats.totalRevenue)}
                  </p>
                );
              })}
            </div>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <div className="p-3">
              <span className="fs-6 d-flex align-items-center gap-2">
                <FaShoppingCart className="mt-1" /> {/* Thêm icon giỏ hàng */}
                Đơn hàng đã bán
              </span>
              {stats?.ordersStats?.length === 0 && (
                <p key={stats.totalRevenue} className="pt-3 fs-4 fw-bold">
                  0
                </p>
              )}
              {stats?.ordersStats?.map((stats) => {
                return (
                  <p key={stats.totalOrder} className="pt-3 fs-4 fw-bold">
                    {stats.totalOrder}
                  </p>
                );
              })}
            </div>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <div className="p-3">
              <span className="fs-6 d-flex align-items-center gap-2">
                <FaBox className="mt-1" /> {/* Thêm icon hộp */}
                Sản phẩm trong kho
              </span>
              {stats?.productStats?.map((stats) => {
                return (
                  <p key={stats.totalRemain} className="pt-3 fs-4 fw-bold">
                    {stats.totalRemain}
                  </p>
                );
              })}
            </div>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <div className="p-3">
              <span className="fs-6 d-flex align-items-center gap-2">
                <FaUser className="mt-1" />
                Người dùng
              </span>
              <p className="pt-3 fs-4 fw-bold">{stats?.userStats}</p>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="firstDateToCompare">
            <Form.Label>Ngày thứ nhất</Form.Label>
            <Form.Control
              type="date"
              name="firstDateToCompare"
              placeholder="First Date To Compare"
              value={firstDateToCompare}
              onChange={handleFirstDate}
            />
          </Form.Group>
          <br />
        </Col>
        <Col md={6}>
          <Form.Group controlId="secondDateToCompare">
            <Form.Label>Ngày thứ hai</Form.Label>
            <Form.Control
              type="date"
              name="secondDateToCompare"
              placeholder="Second Date To Compare"
              value={secondDateToCompare}
              onChange={handleSecondDate}
            />
          </Form.Group>
        </Col>
      </Row>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{
              value: "Thời gian",
              offset: 50,
              position: "insideBottomRight",
            }}
            allowDuplicatedCategory={false}
          />
          <YAxis
            label={{
              value: "Doanh thu VNĐ",
              angle: -90,
              position: "insideLeft",
              offset: -10,
            }}
          />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          {dataForFirstDate?.length > dataForSecondDate?.length ? (
            <>
              <Line
                data={dataForFirstDate}
                type="monotone"
                dataKey={firstDateToCompare}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                strokeWidth={4}
              />
              <Line
                data={dataForSecondDate}
                type="monotone"
                dataKey={secondDateToCompare}
                stroke="#82ca9d"
                strokeWidth={4}
              />
            </>
          ) : (
            <>
              <Line
                data={dataForSecondDate}
                type="monotone"
                dataKey={secondDateToCompare}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                strokeWidth={4}
              />
              <Line
                data={dataForFirstDate}
                type="monotone"
                dataKey={firstDateToCompare}
                stroke="#82ca9d"
                strokeWidth={4}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default AdminDashboard;
