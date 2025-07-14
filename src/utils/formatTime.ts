type FormatTimeParams = {
  options: Intl.DateTimeFormatOptions;
  value: Date | number | string;
};

const handleString = (value: string) => {
  return new Date(value);
};

export const formatTime = ({ options, value }: FormatTimeParams) => {
  let formatValue = value;
  if (typeof value === "string") {
    formatValue = handleString(value);
  }
  return Intl.DateTimeFormat("vi-VN", options).format(
    formatValue as Date | number,
  );
};
