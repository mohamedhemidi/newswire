import { SelectOption } from "types/Select";

export const transformDataToSelect = (data: SelectOption[]) => {
  const options: SelectOption[] = [];
  data.forEach((item: SelectOption) => {
    for (const [key, value] of Object.entries(item)) {
      options.push({ label: key, value: value });
    }
  });
  return options;
};
export const transformSettingsToSelect = (data: string[]) => {
  const options: SelectOption[] = [];
  data &&
    data.map((i: string) => {
      const words = i.split("-");
      const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      const transformedString = capitalizedWords.join(" ");
      options.push({ label: transformedString, value: i });
    });
  return options;
};
