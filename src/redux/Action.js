export const layoutChange = () => {
  return {
    type: 'LAYOUT',
  };
};
export const labelsData = label => {
  return {
    type: 'LabelsData',
    payload: label,
  };
};
