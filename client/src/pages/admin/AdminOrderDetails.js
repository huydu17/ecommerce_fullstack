import React from "react";
import { Button } from "react-bootstrap";

import {
  confirmOrder,
  transitOrder,
  confirmDeliverd,
} from "../../apicalls/order";
import { OrderStatus } from "../../constants/orderStatus";
import SuccessToast from "../../components/common/SuccessToast";
import ErrorToast from "../../components/common/ErrorToast";
import OrderDetailsBase from "../../components/OrderDetailBase";

function AdminOrderDetails() {
  const handleOrderAction = async (action, orderId, successMessage) => {
    try {
      const response = await action(orderId);
      if (response.error) {
        ErrorToast(response.error);
      } else {
        SuccessToast(successMessage);
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const renderAdminActions = (order, updateOrder) => {
    const actionMap = {
      [OrderStatus.PENDING]: {
        action: confirmOrder,
        text: "Xác nhận đơn hàng",
        variant: "primary",
      },
      [OrderStatus.APPROVED]: {
        action: transitOrder,
        text: "Bắt đầu vận chuyển",
        variant: "warning",
      },
      [OrderStatus.IN_TRANSIT]: {
        action: confirmDeliverd,
        text: "Xác nhận đã giao",
        variant: "success",
      },
    };

    const currentAction = actionMap[order.status];

    return currentAction ? (
      <Button
        variant={currentAction.variant}
        className="mt-3"
        onClick={async () => {
          const updated = await handleOrderAction(
            currentAction.action,
            order._id,
            currentAction.text
          );
          if (updated) updateOrder();
        }}
      >
        {currentAction.text}
      </Button>
    ) : null;
  };

  return (
    <OrderDetailsBase isAdmin={true} additionalActions={renderAdminActions} />
  );
}

export default AdminOrderDetails;
