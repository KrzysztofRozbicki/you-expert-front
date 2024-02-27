import {
  Flex,
  Heading,
  Spinner,
  Input,
  Text,
  Textarea,
  Checkbox
} from '@chakra-ui/react';
import OfferItem from '../offerItem';
import { Offer } from '../offersList/UI';
import NotificationItem from './notifications/notificationItem';
import { ButtonController } from '../common/ButtonController';
import SelectController from '../common/SelectController';
import selectStyle from '../filters/selectStyle';
import SwitchController from '../common/SwitchController';
import OrderPreviewItem from '../orderPreviewItem';
import FileInput from './fileInput';

interface AnyContentType {
  [key: string]: any;
}
export interface TabContentUIProps {
  offers?: any;
  currentAction: string;
  notifications?: AnyContentType[];
  orders?: AnyContentType[];
  loadMoreNotifications?: any;
  onNotificationClick?: any;
  onNotificationStarClick?: any;
  notificationLoading?: any;
  hideTitle?: boolean;
  actionsData?: any;
  onFieldChange?: any;
  onButtonClick?: any;
  onOfferClick?: any;
  customTitles?: string[];
  activeTitle?: string;
  onTitleClick?: (title: string) => void;
  onTabClick?: (tabTitle: string) => void;
  is_expert?: boolean;
  handleSaveImages?: (files: any | any[]) => any;
  handleDeleteFile?: (id: number, field: string) => void;
  handleSelectItem?: () => void;
  contentWrapperStyle?: any;
  unfollowFilter?: (id: string) => void;
  isShouldShowInvoiceColumn?: boolean;
}

export interface TabContentProps {
  currentAction: string;
  hideTitle?: boolean;
  customTitles?: string[];
  onActionTrigger?: any;
  onTabClick?: (tabTitle: string) => void;
  orders?: AnyContentType[];
  is_expert?: boolean;
  contentWrapperStyle?: any;
  isShouldShowInvoiceColumn?: boolean;
  isShouldShowAskInvoiceButton?: boolean;
  currentUserId?: null | number;
  balanceData?: null | {
    frozenFunds: number;
    pendingFunds: number;
    totalFunds: number;
    withdrawnFunds: number;
  };
  profileActionInitialConfig?: any[];
}

export const renderList = (
  items: Offer[],
  onOfferClick: any,
  unfollowFilter: (id: string) => void
) => {
  return (
    <Flex
      wrap="wrap"
      justify="space-between"
      w="100%"
      p={{ sm: '5%', lg: '80px', xl: '111px' }}
    >
      {items.map((item, itemIndex) => {
        return (
          <OfferItem
            w={{ sm: '100%', lg: '45%', xl: '45%' }}
            onClick={onOfferClick}
            offerData={{ ...item }}
            key={new Date().getTime()}
            {...item}
            unfollowFilter={unfollowFilter}
          />
        );
      })}
    </Flex>
  );
};

export const renderNotificationst = (
  notificationLoading: boolean,
  notifications: any[],
  onNotificationClick: any,
  onNotificationStarClick: any,
  loadMoreNotifications: any,
  t: any
) => {
  if (notificationLoading) return <Spinner />;

  return (
    <Flex
      p={{ sm: '5%', lg: '80px', xl: '55px 32px' }}
      w="100%"
      direction="column"
    >
      <Flex direction="column">
        {notifications.map((notification, notificationIdx) => {
          return (
            <NotificationItem
              onClick={onNotificationClick}
              onStarClick={onNotificationStarClick}
              key={`notification-${notificationIdx + 2}`}
              {...notification}
            />
          );
        })}
      </Flex>
      <ButtonController
        w={{ sm: '90%', lg: '30%', xl: '30%' }}
        customStyle={{ margin: '30px auto 0 auto', fontSize: '0.8rem' }}
        onClick={loadMoreNotifications}
        variant="darkPurpul"
      >
        {t('dashboard', 'notifications', 'loadMore')}
      </ButtonController>
    </Flex>
  );
};

export const renderOrdersList = (
  loading: boolean,
  orders: any[],
  onOrderClick: any,
  onCancel: any,
  loadMore: any,
  t: any,
  activeTab?: string,
  is_expert?: boolean,
  isShouldShowInvoiceColumn?: boolean
) => {
  if (loading) return <Spinner />;
  if (!orders || !orders.length)
    return <Flex p="40px">{t('common', 'labels', 'noData')}</Flex>;

  return (
    <Flex
      p={{ sm: '5%', lg: '80px', xl: '55px 32px' }}
      w="100%"
      direction="column"
    >
      <Flex direction="column">
        {!is_expert && (
          <Flex justifyContent="space-between" mb="13px" p="0 3%">
            <Text
              w="32%"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'expert')}
            </Text>
            <Text
              w="16%"
              textAlign="center"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'service')}
            </Text>
            <Text
              w="16%"
              textAlign="center"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'dates')}
            </Text>
            <Text
              pl="30px"
              w="16%"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'status')}
            </Text>
            <Text
              w="16%"
              textAlign="center"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'messages')}
            </Text>
            {isShouldShowInvoiceColumn && (
              <Text
                w="16%"
                textAlign="center"
                fontWeight="500"
                fontSize="0.8rem"
                textTransform="uppercase"
                color="#C3C3D2"
              >
                {t('common', 'labels', 'invoice')}
              </Text>
            )}
          </Flex>
        )}
        {is_expert && (
          <Flex justifyContent="space-between" mb="13px" p="0 3%">
            <Text
              w="25%"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'service')}
            </Text>
            <Text
              w="25%"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
              textAlign="center"
            >
              {t('common', 'labels', 'dates')}
            </Text>
            <Text
              w="25%"
              textAlign="center"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'status')}
            </Text>
            <Text
              w="25%"
              textAlign="center"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'messages')}
            </Text>
            {isShouldShowInvoiceColumn && (
              <Text
                w="25%"
                textAlign="center"
                fontWeight="500"
                fontSize="0.8rem"
                textTransform="uppercase"
                color="#C3C3D2"
              >
                {t('common', 'labels', 'invoice')}
              </Text>
            )}
          </Flex>
        )}
        {orders.map((order, orderIdx) => {
          return (
            <OrderPreviewItem
              key={`order-${orderIdx + 3}`}
              order={order}
              isExpert={is_expert}
              isShouldShowInvoiceColumn={isShouldShowInvoiceColumn}
            />
          );
        })}
      </Flex>
      {/* <ButtonController
        w={{ sm: '90%', lg: '30%', xl: '30%' }}
        customStyle={{ margin: '30px auto 0 auto' }}
        onClick={loadMore}
        variant="darkPurpul"
      >
        {t('dashboard', 'notifications', 'loadMore')}
      </ButtonController> */}
    </Flex>
  );
};

interface AccountItenConfig {
  inputType: string;
  name: string;
  additionalInfo?: boolean;
  disabled?: boolean;
  options?: string[];
}

export const accountUIConfiguration: AccountItenConfig[] = [
  {
    inputType: 'image',
    name: 'avatar'
  },
  {
    inputType: 'text',
    name: 'title'
  },
  {
    inputType: 'text',
    name: 'firstName'
  },
  {
    inputType: 'text',
    name: 'lastName'
  },
  {
    inputType: 'email',
    name: 'email',
    disabled: true
  },
  {
    inputType: 'description',
    name: 'description'
  },

  // {
  //   inputType: 'select',
  //   name: 'onlineStatus',
  //   options: ['online', 'offline'],
  //   additionalInfo: true
  // },
  {
    inputType: 'button',
    name: 'saveChanges'
  }
];

export const billingUIConfiguration: AccountItenConfig[] = [
  // {
  //   inputType: 'text',
  //   name: 'fullName'
  // },
  {
    inputType: 'text',
    name: 'title'
  },
  {
    inputType: 'text',
    name: 'companyName'
  },
  {
    inputType: 'text',
    name: 'country'
  },
  {
    inputType: 'text',
    name: 'stateProvince'
  },
  {
    inputType: 'text',
    name: 'streetAdress'
  },
  {
    inputType: 'text',
    name: 'city'
  },
  {
    inputType: 'text',
    name: 'postalCode'
  },
  {
    inputType: 'text',
    name: 'vatNumber'
  },
  {
    inputType: 'radio',
    name: 'eInvoices',
    additionalInfo: true
  },
  {
    inputType: 'checkbox',
    name: 'termsAndServices'
  },
  {
    inputType: 'button',
    name: 'saveChanges'
  }
];

const getLabelComponent = (translation: any, name: string) => {
  return (
    <Text
      mr={{ md: '5%' }}
      fontSize={{ sm: '14px', md: '16px', lg: '18px', xl: '18px' }}
      w="100px"
      mb={{ sm: '10px', md: '8px' }}
      ml={{ sm: '20px', md: '0' }}
    >
      {translation('settings', 'labels', name)}
    </Text>
  );
};

const renderAdditionalInfo = (translation: any, name: string) => {
  return (
    <Text
      mr="5%"
      fontSize={{ sm: '14px', md: '13px', lg: '12px', xl: '12px' }}
      mb="8px"
    >
      {translation('settings', 'additionalInfo', name)}
    </Text>
  );
};

export const renderAccountContent = (
  config: AccountItenConfig[],
  translation: any,
  isDisabled: boolean,
  profileData?: any,
  fieldType?: string,
  onChange?: (data: string, fieldType: string, field: string) => void,
  onButtonClick?: (uid: string, fieldType: string) => void,
  handleSaveImages?: (files: any | any[]) => void,
  handleDeleteFile?: (id: number, field?: string) => void,
  handleSelectItem?: () => void,
  is_expert?: any
) => {
  return (
    <Flex w="100%" direction="column" p="5%">
      {config.map((item, itemIdx) => {
        const { inputType, name, disabled, options } = item;
        if (inputType === 'image') {
          return (
            <Flex w="100%" direction="column">
              <FileInput
                file={profileData?.avatar?.file}
                title={translation('common', 'labels', 'uploadAvatar')}
                onSaveFiles={handleSaveImages}
                handleDeleteFile={(id: number) => handleDeleteFile(id)}
                imgAlt={`${profileData?.first_name} ${profileData?.last_name}`}
              />
            </Flex>
          );
        }
        if (inputType === 'description') {
          if (is_expert) {
            return (
              <Flex
                justify="space-between"
                align={{ md: 'center' }}
                mb="35px"
                flexDirection={{ sm: 'column', md: 'row' }}
              >
                {getLabelComponent(translation, name)}
                <Textarea
                  flex={{ md: 1 }}
                  maxWidth={{ md: '420px' }}
                  h={{ sm: '200px', md: '150px' }}
                  disabled={isDisabled}
                  value={profileData && name ? profileData[name] : ''}
                  onChange={(e) => onChange(e.target.value, fieldType, name)}
                />
              </Flex>
            );
          }
          return null;
        }
        if (inputType === 'text' && name === 'title' && !is_expert) {
          return null;
        }
        if (inputType === 'checkbox') {
          return (
            <Flex justify="space-between" align="center" mb="35px">
              {getLabelComponent(translation, name)}
              <Checkbox
                size="lg"
                colorScheme="transparent"
                iconColor="#7A72DF"
                wrapperStyle={{ marginRight: '44px', width: 'auto' }}
                onChange={() => handleSelectItem()}
                isChecked={profileData && name ? profileData[name] : ''}
              />
            </Flex>
          );
        }
        if (inputType === 'select') {
          const optionsValues = options
            ? options.map((option) => {
                const formattedValue = translation(
                  'common',
                  'statuses',
                  option
                );
                return {
                  value: formattedValue,
                  label: formattedValue
                };
              })
            : [];
          return (
            <Flex w="100%" direction="column" mb="35px">
              <Flex
                w="100%"
                direction="row"
                justify="space-between"
                align="center"
              >
                {getLabelComponent(translation, name)}
                <SelectController
                  placeholder="Set status"
                  wrapperStyle={{ width: '420px' }}
                  options={optionsValues}
                  onChange={(option) => onChange(option, fieldType, name)}
                  value={name && profileData ? profileData[name] : null}
                  customStyle={{
                    ...selectStyle,
                    control: (styles, info) => {
                      const { hasValue } = info;
                      return {
                        ...styles,
                        position: 'relative',
                        zIndex: '2',
                        width: '100%',
                        height: '57px',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        border: `1px solid ${hasValue ? '#EC8581' : '#DCDCF4'}`,
                        color: '#020055',
                        borderRadius: '57px',
                        padding: '7px 5%',
                        boxShadow: 'none',
                        '&:hover': {
                          border: `1px solid ${
                            hasValue ? '#EC8581' : '#DCDCF4'
                          }`
                        }
                      };
                    },
                    placeholder: (styles) => {
                      return { ...styles, color: '#B5B5D1' };
                    }
                  }}
                />
              </Flex>
              <Flex maxWidth="167px">
                {renderAdditionalInfo(translation, name)}
              </Flex>
            </Flex>
          );
        } else if (inputType === 'button') {
          return (
            <ButtonController
              variant="yellow"
              w={{
                sm: '100%',
                md: '70%',
                lg: '60%',
                xl: '30% !important',
                '2xl': '30%'
              }}
              isDisabled={isDisabled}
              customM={{ xl: '0 0 0 auto' }}
              onClick={() => onButtonClick(profileData.user_id, fieldType)}
            >
              {translation('settings', 'buttons', name)}
            </ButtonController>
          );
        } else if (inputType === 'radio') {
          return (
            <Flex mb="51px" justify="space-between">
              <Flex direction="column" maxWidth="420px">
                {getLabelComponent(translation, name)}
                {renderAdditionalInfo(translation, name)}
              </Flex>

              <SwitchController
                disabled={disabled || isDisabled}
                handleChange={() => null}
                checked={true}
              />
            </Flex>
          );
        }
        if (profileData) {
          const { firstName, first_name, lastName, last_name } = profileData;
          const updatedProfileData = profileData
            ? {
                ...profileData,
                firstName: firstName || first_name || '',
                lastName: lastName || last_name || '',
                fullName: `${firstName || first_name} ${lastName || last_name}`
              }
            : {};

          return (
            <Flex
              justify="space-between"
              align={{ md: 'center' }}
              mb="35px"
              flexDirection={{ sm: 'column', md: 'row' }}
            >
              {getLabelComponent(translation, name)}
              <Input
                flex={1}
                borderRadius="55px"
                minHeight="57px"
                disabled={disabled || isDisabled}
                maxWidth={{ md: '420px' }}
                value={updatedProfileData[name] || ''}
                onChange={(e) => onChange(e.target.value, fieldType, name)}
              />
            </Flex>
          );
        }
        return (
          <Flex
            justify="space-between"
            align={{ md: 'center' }}
            mb="35px"
            flexDirection={{ sm: 'column', md: 'row' }}
          >
            {getLabelComponent(translation, name)}
            <Input
              flex={1}
              borderRadius="55px"
              minHeight="57px"
              maxWidth={{ md: '420px' }}
              value={''}
              disabled={disabled}
              onChange={(e) => onChange(e.target.value, fieldType, name)}
            />
          </Flex>
        );
      })}
    </Flex>
  );
};

export const renderBusinessInformationContent = (
  genetalTitle: string,
  description: string,
  config: AccountItenConfig[],
  translation: any,
  is_expert: boolean,
  profileData?: any,
  onChange?: (data: string, fieldType: string, field: string) => void,
  onButtonClick?: (uid: string, fieldType: string) => void,
  handleSelectItem?: () => void
) => {
  return (
    <Flex w="100%" direction="column">
      <Flex
        direction="column"
        p={{
          lg: '57px 112px 0 112px',
          xl: '57px 112px 0 112px',
          '2xl': '57px 112px 0 112px'
        }}
      >
        <Heading fontSize="30px" fontWeight="500" mb="30px">
          {translation('settings', 'titles', genetalTitle)}
        </Heading>
        {/* <Text maxWidth="80%">
          {translation('settings', 'description', description)}
        </Text> */}
      </Flex>
      {renderAccountContent(
        config,
        translation,
        is_expert ? false : true,
        profileData,
        description,
        onChange,
        onButtonClick,
        null,
        null,
        handleSelectItem
      )}
    </Flex>
  );
};
