import axios from 'axios';
import { apiHost } from '../../api/common';

export const updateBusinessInformationAction = async (
  data: any,
  userId: string | number
): Promise<any> => {
  try {
    const newData: any = {
      country: data?.country,
      city: data?.city,
      street: data?.street,
      zip_code: data?.zipCode,
      phone_number: data?.phoneNumber,
      e_invoices: !!data?.eInvoices,
      issuing_invoices: data?.issuingInvoices,
      is_company: data?.isCompany,
    };

    if (!!data?.isCompany) {
      newData.company_name = data?.companyName;
      newData.nip_number = data?.nipNumber;
    }

    const res = await axios({
      method: 'PATCH',
      url: `${apiHost}/accounts/profile/${userId}/`,
      data: newData
    });

    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const becomeAnExpertAction = async (data: any): Promise<any> => {
  try {
    const newData: any = {
      country: data?.country,
      city: data?.city,
      street: data?.street,
      zip_code: data?.zipCode,
      phone_number: data?.phoneNumber,
      e_invoices: !!data?.eInvoices,
      issuing_invoices: data?.issuingInvoices,
      is_company: data?.isCompany
    };

    if (!!data?.isCompany) {
      newData.company_name = data?.companyName;
      newData.nip_number = data?.nipNumber;
    }

    await axios({
      method: 'POST',
      url: `${apiHost}/accounts/become-expert/`,
      data: newData
    });
  } catch (e) {
    throw new Error(e);
  }
};
