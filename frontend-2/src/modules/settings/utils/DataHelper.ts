type SelectOption = {
  [key: string]: string;
};

export const transformDataToSelect = (data: SelectOption[]) => {
  const options: SelectOption[] = [];
  data.forEach((item: SelectOption) => {
    for (const [key, value] of Object.entries(item)) {
      options.push({ label: key, value: value });
    }
  });
  return options;
};