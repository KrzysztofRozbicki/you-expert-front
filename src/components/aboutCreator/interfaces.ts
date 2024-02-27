export interface AboutCreatorUIProps {
  creatorData: {
    description?: string;
  };
  backExpertData: {
    avatarUrl: string;
    id: number;
    issuingInvoices?: null;
    publicName: string;
    rating: string;
    reviewCount: number;
    title: string;
  };
  expertRedirect: (id: number | string) => void;
}
