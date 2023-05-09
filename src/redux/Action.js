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
export const toggleLang = toggle => {
  return {
    type: 'Toggle',
    //payload: toggle,
  };
};
