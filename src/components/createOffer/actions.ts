import axios from 'axios';
import { apiHost } from '../../api/common';
import {
  SET_CREATE_OFFER_STATE,
  SET_CREATE_OFFER_LOADING,
  SET_CREATE_OFFER_PARAMS,
  RESET_CREATE_OFFER_STORE,
  SET_CREATE_OFFER_CATEGORIES,
  SET_CREATE_OFFER_PUBLISHED_DATA
} from './constants';
import {
  offerType,
  pricingParamsItem,
  paramsByServiceType,
  setCreateOfferStateActionType,
  setCreateOfferLoadingActionType,
  setCreateOfferParamsActionType,
  categoriesItem,
  subcategoryItem,
  resetCreateOfferStoreActionType,
  setCreateOfferPublishedDataActionType,
  setCreateOfferCategoriesActionType
} from './interfaces';

export const setCreateOfferCategoriesAction = (payload: {
  categories: categoriesItem[];
  subcategories: subcategoryItem[];
}): setCreateOfferCategoriesActionType => ({
  type: SET_CREATE_OFFER_CATEGORIES,
  payload
});

export const setCreateOfferStateAction = (
  payload: offerType
): setCreateOfferStateActionType => ({
  type: SET_CREATE_OFFER_STATE,
  payload
});

export const setCreateOfferLoadingAction = (
  payload: boolean
): setCreateOfferLoadingActionType => ({
  type: SET_CREATE_OFFER_LOADING,
  payload
});

export const setCreateOfferParamsAction = (payload: {
  paramsByService: paramsByServiceType;
  pricingParams: pricingParamsItem[];
}): setCreateOfferParamsActionType => ({
  type: SET_CREATE_OFFER_PARAMS,
  payload
});

export const resetCreateOfferStoreAction =
  (): resetCreateOfferStoreActionType => ({
    type: RESET_CREATE_OFFER_STORE
  });

export const setCreateOfferPublishedDataAction = (
  payload: any
): setCreateOfferPublishedDataActionType => ({
  type: SET_CREATE_OFFER_PUBLISHED_DATA,
  payload
});

export const getCategories = async (): Promise<{
  categories: categoriesItem[];
  subcategories: subcategoryItem[];
}> => {
  try {
    const categoriesRes = await axios({
      method: 'GET',
      url: `${apiHost}/category-services/`
    });
    const subcategoriesRes = await axios({
      method: 'GET',
      url: `${apiHost}/subcategory-services/`
    });

    return {
      categories: categoriesRes?.data,
      subcategories: subcategoriesRes?.data
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const getServicesByCategory = (serviceId: number) => {
  return async (dispatch) => {
    try {
      dispatch(setCreateOfferLoadingAction(true));
      const res = await axios({
        method: 'GET',
        url: `${apiHost}/services/${serviceId}/`
      });

      if (res?.data) {
        const pricingParams = res.data.parameters.map((item) => ({
          id: item.id,
          name: item.name,
          isOptional: false,
          type: item.type,
          value: ''
        }));
        dispatch(
          setCreateOfferParamsAction({
            paramsByService: res?.data,
            pricingParams
          })
        );
        dispatch(setCreateOfferLoadingAction(false));
      }
    } catch (e) {
      console.error(e);
    }
  };
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

export const createOfferAction = async (
  offer: offerType,
  isActive: boolean
): Promise<any> => {
  try {
    const filesData = [...offer.images, ...offer.videos]
      .sort((a: any, b: any) =>
        +!!a?.isOfferImage > +!!b?.isOfferImage ? -1 : 1
      )
      .map((item, index) => ({
        ...item,
        index_value: index + 1
      }));

    const videos = filesData
      .filter((item: any) => item?.videoUrl)
      .map((item: any) => ({
        video_url: item.videoUrl,
        index_value: item.index_value
      }));

    const images = filesData
      .filter((item: any) => item?.file)
      .map((item: any) => ({
        index_value: item.index_value,
        image: {
          filename: item.filename,
          file: item.file
        }
      }));

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
      commission_rate: +offer.commission,
      is_active: isActive
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
      method: 'POST',
      url: `${apiHost}/offers/`,
      data
    });

    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};
