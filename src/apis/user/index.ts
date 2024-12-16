export interface getRedeemHistoryOutput {
  checkProduct: [
    {
      orderItem: [
        {
          createdAt: string;
          price: string;
          qty: number;
          shopItem: {
            image_url: string;
            name: string;
          };
        },
      ];
      status: string;
    },
  ];
  checkVoucher: [
    {
      rewardInstance: {
        expiredAt: string;

        reward: {
          description: string;
          imageUrl: string;
          name: string;
          type: string;
          voucherType: string;
        };
        value: string;
      };
    },
  ];
}

export interface getPointHistoryOutput {
  data: [
    {
      campaignEntry: {
        type: string;
      };
      value: string;
      description: string;
      createdAt: string;
    },
  ];
}
