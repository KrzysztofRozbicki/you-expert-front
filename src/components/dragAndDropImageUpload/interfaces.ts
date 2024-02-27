export interface IFileItem {
  id: number;
  filename: string;
  file?: string;
  imageUrl?: string;
  indexValue?: number;
  isNew?: boolean;
  isOfferImage?: boolean;
}

export interface DragAndDropImageUploadProps {
  files: IFileItem[];
  onUploadImage: (files: File[]) => any;
  onDeleteImage: (id: number) => any;
  onSelectOfferImage: (id: number) => any;
}

export interface FileItemProps {
  fileData: IFileItem;
  handleDeleteFile: () => void;
  handleSelectOffer: () => void;
}
