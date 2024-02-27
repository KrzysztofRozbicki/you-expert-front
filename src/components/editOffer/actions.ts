import axios from 'axios';
import { apiHost } from '../../api/common';
import {
  getArrayFromObject,
  getOfferPriceWithCommission,
  getOfferPriceWithoutCommission
} from '../../utils';
import { ALLOWED_FORMATS } from '../orderChat/constants';
import {
  RESET_EDIT_OFFER_STORE,
  SET_EDIT_OFFER_INITIAL_DATA,
  SET_EDIT_OFFER_EDITABLE_DATA,
  SET_EDIT_OFFER_PUBLISHED_DATA
} from './constants';
import {
  IEditOfferData,
  IInitialOfferData,
  resetEditOfferStoreActionType,
  paramsByServiceType,
  setEditOfferInitialDataActionType,
  setEditOfferEditableDataActionType,
  setEditOfferPublishedDataActionType
} from './interfaces';

export const resetEditOfferAction = (): resetEditOfferStoreActionType => ({
  type: RESET_EDIT_OFFER_STORE
});

export const setEditOfferInitialDataAction = (payload: {
  initialOfferData: IInitialOfferData;
  editOfferData: IEditOfferData;
  paramsByService: paramsByServiceType;
}): setEditOfferInitialDataActionType => ({
  type: SET_EDIT_OFFER_INITIAL_DATA,
  payload
});

export const setEditOfferEditableDataAction = (
  payload: IEditOfferData
): setEditOfferEditableDataActionType => ({
  type: SET_EDIT_OFFER_EDITABLE_DATA,
  payload
});

export const setEditOfferPublishedDataAction = (
  payload: any
): setEditOfferPublishedDataActionType => ({
  type: SET_EDIT_OFFER_PUBLISHED_DATA,
  payload
});

export const getInitialDataAction = async (
  offerId: string
): Promise<{
  initialOfferData: IInitialOfferData;
  editOfferData: IEditOfferData;
  paramsByService: paramsByServiceType;
}> => {
  try {
    const offerRes = await axios({
      method: 'GET',
      url: `${apiHost}/offers/${offerId}/self`
    });

    const paramsRes = await axios({
      method: 'GET',
      url: `${apiHost}/services/${offerRes?.data?.service?.id}/`
    });

    const paramsAnswerBasic = getArrayFromObject(
      offerRes?.data?.parameterAnswersBasic
    );
    const paramsAnswerStandard = getArrayFromObject(
      offerRes?.data?.parameterAnswersStandard
    );
    const paramsAnswerPremium = getArrayFromObject(
      offerRes?.data?.parameterAnswersPremium
    );

    const editOfferData: IEditOfferData = {
      commission: offerRes?.data?.commissionRate?.toFixed(0),
      serviceTitle: offerRes?.data?.title || '',
      requirements: offerRes?.data?.requirements || '',
      description: offerRes?.data?.description || '',
      category: offerRes?.data?.serviceCategory
        ? {
            ...offerRes?.data?.serviceCategory,
            label: offerRes?.data?.serviceCategory?.name,
            value: offerRes?.data?.serviceCategory?.name
          }
        : {
            label: '',
            value: '',
            slug: ''
          },
      subcategory: offerRes?.data?.serviceSubcategory
        ? {
            ...offerRes?.data?.serviceSubcategory,
            label: offerRes?.data?.serviceSubcategory?.name,
            value: offerRes?.data?.serviceSubcategory?.name
          }
        : {
            label: '',
            value: '',
            slug: ''
          },
      service: offerRes?.data?.service
        ? {
            ...offerRes?.data?.service,
            label: offerRes?.data?.service?.name,
            value: offerRes?.data?.service?.name
          }
        : {
            label: '',
            value: '',
            slug: ''
          },
      images: offerRes?.data?.gallery
        .filter((item) => item?.type === 'image')
        .map((item) => ({
          ...item,
          filename: item?.imageUrl?.slice(item?.imageUrl?.lastIndexOf('/') + 1)
        })),
      videos: offerRes?.data?.gallery.filter((item) => item?.type === 'video'),
      pricing: {
        basic: {
          isOn: offerRes?.data?.deliveryDateInDaysBasic ? true : false,
          deliveryTime: offerRes?.data?.deliveryDateInDaysBasic
            ? `${offerRes?.data?.deliveryDateInDaysBasic}`
            : '',
          price: offerRes?.data?.priceBasic
            ? `${getOfferPriceWithoutCommission(
                +offerRes?.data?.priceBasic,
                +offerRes?.data?.commissionRate
              )}`
            : '',
          params: paramsRes?.data?.parameters.map((item) => ({
            id: item?.id,
            name: item?.name,
            isOptional: false,
            type: item?.type,
            title: item?.title,
            value: paramsAnswerBasic.find((param) => param?.key === item?.title)
              ?.value
          }))
        },
        standard: {
          isOn: offerRes?.data?.deliveryDateInDaysStandard ? true : false,
          deliveryTime: offerRes?.data?.deliveryDateInDaysStandard
            ? `${offerRes?.data?.deliveryDateInDaysStandard}`
            : '',
          price: offerRes?.data?.priceStandard
            ? `${getOfferPriceWithoutCommission(
                +offerRes?.data?.priceStandard,
                +offerRes?.data?.commissionRate
              )}`
            : '',
          params: paramsRes?.data?.parameters.map((item) => ({
            id: item?.id,
            name: item?.name,
            isOptional: false,
            type: item?.type,
            title: item?.title,
            value: paramsAnswerStandard.find(
              (param) => param?.key === item?.title
            )?.value
          }))
        },
        premium: {
          isOn: offerRes?.data?.deliveryDateInDaysPremium ? true : false,
          deliveryTime: offerRes?.data?.deliveryDateInDaysPremium
            ? `${offerRes?.data?.deliveryDateInDaysPremium}`
            : '',
          price: offerRes?.data?.pricePremium
            ? `${getOfferPriceWithoutCommission(
                +offerRes?.data?.pricePremium,
                +offerRes?.data?.commissionRate
              )}`
            : '',
          params: paramsRes?.data?.parameters.map((item) => ({
            id: item?.id,
            name: item?.name,
            isOptional: false,
            type: item?.type,
            title: item?.title,
            value: paramsAnswerPremium.find(
              (param) => param?.key === item?.title
            )?.value
          }))
        }
      }
    };

    const findOfferImageIndex = editOfferData.images.findIndex((file) =>
      ALLOWED_FORMATS.some((format) => file?.filename.includes(`.${format}`))
    );

    if (findOfferImageIndex !== -1) {
      editOfferData.images[findOfferImageIndex].isOfferImage = true;
    }

    return {
      initialOfferData: offerRes?.data,
      editOfferData,
      paramsByService: paramsRes?.data
    };
  } catch (e) {
    throw new Error(e);
  }
};

const getValueByType = (value: any, type: string): any => {
  if (type === 'BOOL') {
    return !!value;
  } else if (type === 'INT') {
    return parseInt(value);
  } else if (type === 'CUSTOM') {
    return value.toString();
  }
};

export const editOfferAction = async (
  offer: IEditOfferData,
  initialOffer: IInitialOfferData
): Promise<any> => {
  try {
    const filesData = [...offer.images, ...offer.videos]
      .sort((a: any, b: any) =>
        +!!a?.isOfferImage > +!!b?.isOfferImage ? -1 : 1
      )
      .map((item, index) => ({ ...item, index_value: index + 1 }));

    const videos = filesData
      .filter((item) => item?.type === 'video')
      .map((item) => {
        if (item?.isNew) {
          delete item?.id;
        }
        return item;
      });

    const images = filesData
      .filter((item: any) => item?.type === 'image')
      .map((item: any) => {
        if (item?.isNew) {
          return {
            index_value: item.index_value,
            image: {
              filename: item.filename,
              file: item.file
            }
          };
        }
        return item;
      });

    const data = {
      title: offer.serviceTitle,
      description: offer.description,
      requirements: offer.requirements,
      user_price_basic: offer.pricing.basic.isOn
        ? parseInt(offer.pricing.basic.price)
        : null,
      user_price_standard: offer.pricing.standard.isOn
        ? parseInt(offer.pricing.standard.price)
        : null,
      user_price_premium: offer.pricing.premium.isOn
        ? parseInt(offer.pricing.premium.price)
        : null,
      delivery_date_in_days_basic: offer.pricing.basic.isOn
        ? +offer.pricing.basic.deliveryTime
        : null,
      delivery_date_in_days_standard: offer.pricing.standard.isOn
        ? +offer.pricing.standard.deliveryTime
        : null,
      delivery_date_in_days_premium: offer.pricing.premium.isOn
        ? +offer.pricing.premium.deliveryTime
        : null,
      parameter_answers_basic: offer.pricing.basic.isOn
        ? offer.pricing.basic.params.reduce((prev, current) => {
            prev[current.id.toString()] = getValueByType(
              current.value,
              current.type
            );
            return prev;
          }, {})
        : null,
      parameter_answers_standard: offer.pricing.standard.isOn
        ? offer.pricing.standard.params.reduce((prev, current) => {
            prev[current.id.toString()] = getValueByType(
              current.value,
              current.type
            );
            return prev;
          }, {})
        : null,
      parameter_answers_premium: offer.pricing.premium.isOn
        ? offer.pricing.premium.params.reduce((prev, current) => {
            prev[current.id.toString()] = getValueByType(
              current.value,
              current.type
            );
            return prev;
          }, {})
        : null,
      service: offer.service.id,
      service_category: offer.category.id,
      currency: 'POLISH_ZLOTY',
      commission_rate: +offer.commission
    } as any;

    if (videos.length) {
      data.videos = videos;
    }

    if (images.length) {
      data.images = images;
    }

    if (offer?.subcategory?.id) {
      data.service_subcategory = offer?.subcategory?.id;
    }

    const res = await axios({
      method: 'PUT',
      url: `${apiHost}/offers/${initialOffer?.id}/`,
      data
    });

    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};
