import { Bootpay } from "@bootpay/client-js";

export const requestPaymentFn = async ({
  price,
  order_name,
  order_id,
  user,
  items,
}) => {
  const response = await Bootpay.requestPayment({
    application_id: "632ebc42cf9f6d001c926699",
    price,
    order_name,
    order_id: `${order_id}`,
    pg: "케이씨피",
    method: [
      "휴대폰",
      "카드",
      "계좌이체",
      "가상계좌",
      "페이코",
      "네이버페이",
      "카카오페이",
    ],
    user,
    items: items,
    extra: {
      open_type: "iframe",
      card_quota: "0,2,3",
      escrow: false,
    },
  });
};
