declare type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading: boolean;
};

declare type FormFieldProps = {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
};

declare type AlertBoxProps = {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading: boolean;
};

declare type CustomCheckBoxProps = {
  value: boolean;
  onValueChange: () => void;
};

declare type DropdownProps = {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
};

declare type SearchBarProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
};

declare type CardProps = {
  title: string;
  content: string;
  date: string;
  views: number;
  onPressDetail: () => void;
};

declare type TabNavigatorProps = {
  title: string;
  routePath: string;
  highlightTab?: string
};
