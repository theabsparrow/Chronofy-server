import { TCategory } from './event.interface';

const keywordCategories: Record<Exclude<TCategory, 'Other'>, string[]> = {
  Work: ['meeting', 'project', 'client', 'deadline', 'presentation'],
  Personal: ['birthday', 'family', 'friend', 'anniversary', 'home'],
  Health: ['doctor', 'gym', 'workout', 'medicine', 'hospital', 'appointment'],
  Finance: ['budget', 'invoice', 'salary', 'tax', 'payment', 'loan'],
  Social: ['party', 'hangout', 'dinner', 'gathering', 'event'],
  Study: ['exam', 'study', 'assignment', 'course', 'lecture', 'class'],
  Travel: ['trip', 'travel', 'vacation', 'flight', 'hotel', 'journey'],
};

export const categorizeEvent = (text: string): TCategory => {
  const scoreMap: Record<TCategory, number> = {
    Work: 0,
    Personal: 0,
    Health: 0,
    Finance: 0,
    Social: 0,
    Study: 0,
    Travel: 0,
    Other: 0,
  };

  const lowerText = text.toLowerCase();

  for (const [category, keywords] of Object.entries(keywordCategories)) {
    let matchCount = 0;
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        matchCount++;
      }
    }

    scoreMap[category as TCategory] = matchCount;
  }

  const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
  const [topCategory, topScore] = sorted[0];

  return topScore > 0 ? (topCategory as TCategory) : 'Other';
};
