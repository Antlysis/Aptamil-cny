export interface CheckValidity {
  data: {
    isValid: boolean;
  };
}

export interface UploadImage {
  data: {
    url: string;
    key: string;
  };
}
export interface CreateEntry {
  data: {
    status?: string;
  };
}

export interface Register {
  data: {
    success: boolean;
    token: string;
    message: string;
  }
}

export interface RegisterOTP {
  data: {
    success: boolean;
    token?: string;
    message?: string;
  };
}

export interface RBRegisterOTP {
  data: {
    success: boolean;
    token: string;
  };
}

export interface Token {
  data: {
    success: boolean;
  }
}

export interface VerifyToken {
  data: {
    success: boolean;
    token: string;
  }
}

export interface OTP {
  data: {
    message: string;
  }
}

export interface Login {
  data: {
    token: string;
  }
}

export interface LoginOTP {
  data: {
    success: boolean;
    token: string;
  };
}

export interface LoginPhone {
  data: {
    token: string;
  }
}

export interface SetPass {
  data: {
    success: boolean;
  }
}

export interface ResetPass {
  data: {
    success: boolean;
    message: string;
    data: {
      recipient: string;
      callbackUrl: string;
    };
  };
}

export interface CheckQR {
  data: {
    referId: boolean;
    retailerId: boolean;
  };
}


export interface CheckUser {
  data: {
    identity: string;
  }
}

export interface RegisterData {
  email: string;
  phone: string;
  password?: string;
  name?: string;
  // type: TokenType;
  referralCode?: string;
  companyId?: string;
}

export interface RegisterOTPData {
  phone?: string;
  email?: string;
  otp: string;
  referralCode?: string;
  // extendedFields?: {[key]: string: any};
  registeredByPromoterId?: string;
  registeredByRetailerId?: string;
  // registerSource?: {[key]: string: any};
  type?: string;

  role?: string;
  retailerIds?: string[];
  dsrId?: string;
  staffCode?: string;
  storeId?: string;
  channel?: string;
  userType?: string;
  userTypeLanguage?: string;
}

export interface RBRegisterOTPData {
  phone?: string;
  email?: string;
  otp: string;
}

export interface TokenData {
  tokenAction: string;
  tokenType: string;
  recipient: string;
  campaignId?: string;
}

export interface VerifyTokenData {
  token: string;
  tokenAction: string;
  tokenType: string;
  recipient: string;
  degenerate?: boolean;
}

export interface OTPData {
  email?: string;
  phone?: string;
  action?: string;
  tokenType?: string;
}

export interface LoginData {
  email?: string;
  phone?: string;
  password?: string;
  type?: string;
}

export interface LoginOTPData {
  phone?: string;
  email?: string;
  otp: string;
  type?: string;
}

export interface LoginPhoneData {
  phone: string;
}

export interface SetPassData {
  token: string;
  tokenType: string;
  password: string;
  recipient: string;
}

export interface ResetPassData {
  recipient: string;
  callbackUrl: string;
}

export interface CheckQRData {
  referId: boolean;
  retailerId: boolean;
}

export interface CheckUserData {
  email?: string;
  phone?: string;
  type?: string;
  campaignId?: string;
}

export interface getUserDetailsOutput {
  data: {
    addressInfo: [],
    personalInfo: {
      name: string;
      phone: string;
      email: string;
      totalUnitsBalance: number;
    },
    success: boolean
  }
}
