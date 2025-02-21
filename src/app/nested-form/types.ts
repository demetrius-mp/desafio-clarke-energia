export type NestedForm = {
  navspot: {
    name: string;
    iconUrl: string;
  }[];
  internalPages: [
    string,
    {
      title: string;
      iconUrl: string;
      tabs: {
        tabName: string;
        chips: {
          chipName: string;
          sections: {
            sectionName: string;
          }[];
        }[];
      }[];
    },
  ][];
};
