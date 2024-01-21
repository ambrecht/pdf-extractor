const calculateCharColor = (isTargetChar, theme, idx) => {
  if (theme.progressDisplay === 'color' && idx === 1) {
    return isTargetChar ? theme.fontColor : '#808080';
  }
  return idx === 1 ? theme.fontColor : '#808080';
};

export default calculateCharColor;
