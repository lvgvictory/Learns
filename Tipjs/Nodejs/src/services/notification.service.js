'use strict';

const Notification = require("../models/notification.model");

const pushNotiToSystem = async ({
  type = 'SHOP-001',
  senderId = 1,
  receiverId = 1,
  options = {},
}) => {
  let noti_content = '';

  if (type === 'SHOP-001') {
    noti_content = `@@@ vừa thêm mới một sản phẩm: @@@@`;
  } else if (type === 'PROMOTION-001') {
    noti_content = `@@@ vừa tạo một chương trình khuyến mãi mới: @@@@@`;
  }

  const newNoti = await Notification.create({
    noti_type: type,
    noti_senderId: senderId,
    noti_receiverId: receiverId,
    noti_content,
    noti_options: options,
  });

  return newNoti;
};

module.exports = {
  pushNotiToSystem,
};
