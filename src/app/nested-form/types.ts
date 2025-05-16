type Button = {
  label: string;
  link: string;
};

export type NestedForm = {
  promotionsSection: {
    title: string;
    subtitle: string;
    iconUrl: string;
    entries: {
      id: string;
      title: string;
      subtitle: string;
      imageUrl: string;
      button: Button | null;
      secondaryButton: Button | null;
    }[];
  };
};
