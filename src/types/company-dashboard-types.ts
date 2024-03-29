export interface PackSize {
  x: number;
  y: number;
}

export interface ReturnPolicy {
  allowExchange?: boolean;
  allowReturn?: boolean;
  returnDays?: number;
}

export interface FormattedPayload {
  companyEmail: string;
  type: string;
  brandName: string;
  drugName: string;
  manufacturingName: string;
  division: string;
  prescription: string;
  licenseNo: string;
  manufacturerName: string;
  contents: string;
  mrp: number;
  effectivePriceCalculationType: "MarginOnSellingPrice" | "DiscountOnMRP";
  retailPrice: number;
  sellingPrice: number;
  packSize: PackSize;
  returnPolicy: ReturnPolicy;
  value: number;
  letterPadDocumentLink?: string;
}
