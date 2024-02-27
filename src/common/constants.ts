export const MAX_OFFER_SECTION = 4;

export const MIN_OFFER_COMMISSION = 5;
export const MAX_OFFER_COMMISSION = 30;
export const OFFER_VAT = 1.23;

export const SUPPORT_EMAIL_ADDRESS =
  process.env.SUPPORT_EMAIL_ADDRESS || 'support@youexpert.pl';

export const PUBLIC_URL =
  process.env.PUBLIC_URL || 'https://proxy.stg.yexp.youexpert.co/';

export const AWS_PUBLIC_BUCKET_URL =
  `${process.env.AWS_PUBLIC_BUCKET_URL}/` ||
  'https://yexp-stg-backend-public-bucket.s3.amazonaws.com/';
