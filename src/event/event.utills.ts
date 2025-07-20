export const categorizeEvent = (
  text: string,
): 'Work' | 'Personal' | 'Other' => {
  const workKeywords = ['meeting', 'project', 'client'];
  const personalKeywords = ['birthday', 'family', 'friend'];

  const lowerText = text.toLowerCase();

  if (workKeywords.some((k) => lowerText.includes(k))) return 'Work';
  if (personalKeywords.some((k) => lowerText.includes(k))) return 'Personal';
  return 'Other';
};
