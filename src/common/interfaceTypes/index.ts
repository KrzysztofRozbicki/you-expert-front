export interface DataObject {
  [key: string]: string | number;
}

export interface SizesStyle {
  lg: 'string';
  xl: 'string';
}

export interface AppState {
  app: {
    sidebarIsOpen: boolean;
    currentLocale: string;
    authModal: boolean;
    authRenderer: string;
  };
}

export interface UserState {
  user: {
    loading: boolean;
    isAuthenticated: boolean;
    error: string;
    token: string;
    message: string;
    profileData: any;
    fullProfileData: any;
  };
}

export interface NotificationItem {
  actionUrl: string;
  createdAt: string;
  isSaved: boolean;
  title: string;
}

export interface NotificationsState {
  notifications: {
    error: any;
    loading: boolean;
    notifications: NotificationItem[];
  };
}
export interface CategoriesState {
  categories: {
    categoryList: CategoryItem[];
    categoryServiceList: ServiceItem[];
    categorySubcategoryList: Subcategory[];
    categoriesSubcategoriesServicesList: ServiceItem[];
    currentCategory: CategoryItem | null;
    currentSubcategory: Subcategory | null;
    currentService: ServiceItem | null;
    loading: boolean;
    errors: null;
  };
}

export interface OfferItem {
  [key: string]: any;
}

export interface OffersState {
  offers: {
    offers: any[];
    favoritOffers: any[];
    expertOffers: any[];
    selfOfferList: any;
    currentOffer: any;
    loading: false;
    error: any;
  };
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
}

export interface CategoryItem {
  id: number;
  name?: string;
  slug: string;
  services?: ServiceItem[];
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  services?: ServiceItem[];
}

export interface TitleWithLineProps {
  title?: string;
  lineStyles?: DataObject;
  wrapperP?: any;
  fsz?: any;
  titleWidth?: any;
  wrapperStyles?: DataObject;
  headerStyles?: DataObject;
}

export interface CategoryState {
  categories: {
    loading: boolean;
    categoryList: CategoryItem[];
    // errors: any,
  };
}

export interface ProfileDetailsUIProps {
  id?: number;
  onContactClick: (id: number | string) => any;
  onQuoteClick: () => any;
  publicName?: string;
  profesion?: string;
  avatarUrl?: string;
  reviewCount?: string | number;
  rating?: string | number;
  title?: string;
  description?: string;
  isExpert?: boolean;
  isContactMeLoading?: boolean;
  isMyProfile?: boolean;
}

export interface DividerControllerProps {
  background?: string;
  customM?: any;
}

export interface TagsComponentProps {
  hideTitle?: any;
  tagsDataList?: any;
  wrapperStyle?: any;
  customStyle?: any;
}
