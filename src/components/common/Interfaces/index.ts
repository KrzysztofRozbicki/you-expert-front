export interface item {
  imagePath: string;
  name: string;
  profession: string;
  rating: number;
  catrgoryType: string;
}

export interface TagItem {
  id: number;
  name: string;
  slug: string;
  label?: string;
}

export interface SwitchItem {
  checked: boolean;
  label?: string;
  handleChange: () => void;
  disabled?: boolean;
}
