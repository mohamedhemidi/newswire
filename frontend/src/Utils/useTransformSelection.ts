interface Category {
    label: string;
    value: string;
  }
  interface Source {
    label: string;
    value: string;
  }
  
  interface SettingsT {
    categories: Category[];
    sources: Source[];
  }

const useTransformSelection = (selectedSettings: SettingsT) => {
  const data: { categories: string[]; sources: string[] } = {
    categories: [],
    sources: [],
  };

  selectedSettings.categories.forEach((i: { label: string; value: string }) => {
    return data.categories.push(i.value);
  });
  selectedSettings.sources.map((i: { label: string; value: string }) => {
    return data.sources.push(i.value);
  });
  return data;
};

export default useTransformSelection;
