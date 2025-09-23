export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  participants: number;
  lessons: StudyLesson[];
  progress?: number;
}

export interface StudyLesson {
  id: string;
  day: number;
  title: string;
  scripture: string;
  content: string;
  questions: string[];
  prayer: string;
  completed?: boolean;
}

export const studyPlansDatabase: StudyPlan[] = [
  {
    id: 'walking-with-jesus',
    title: "Walking with Jesus",
    description: "A 30-day journey through the life and teachings of Christ",
    duration: 30,
    category: "Discipleship",
    difficulty: "Beginner",
    participants: 1250,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "The Call to Follow",
        scripture: "Matthew 4:18-22",
        content: "Jesus called ordinary fishermen to become His disciples. He calls us too, not because we're perfect, but because He has a purpose for our lives.",
        questions: [
          "What does it mean to 'follow' Jesus in your daily life?",
          "What might you need to 'leave behind' to follow Jesus more closely?",
          "How can you respond to Jesus' call today?"
        ],
        prayer: "Jesus, thank You for calling me to follow You. Help me to respond with the same willingness as the disciples. Show me what I need to leave behind and give me courage to follow You wholeheartedly. Amen."
      },
      {
        id: 'day-2',
        day: 2,
        title: "The Greatest Commandment",
        scripture: "Matthew 22:37-39",
        content: "Love for God and love for others - this is the foundation of Christian living. Everything else flows from these two commandments.",
        questions: [
          "How do you currently show love to God?",
          "Who in your life needs more of your love?",
          "What practical step can you take today to love someone better?"
        ],
        prayer: "Lord, fill my heart with love for You and for others. Help me to see people through Your eyes and to love them with Your love. Make me an instrument of Your love today. Amen."
      }
    ]
  },
  {
    id: 'psalms-of-hope',
    title: "Psalms of Hope",
    description: "Finding comfort and strength in David's words",
    duration: 14,
    category: "Comfort",
    difficulty: "All Levels",
    participants: 890,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "The Lord is My Shepherd",
        scripture: "Psalm 23",
        content: "Perhaps the most beloved psalm, Psalm 23 reminds us of God's tender care and provision. Even in difficult times, we can trust in His goodness.",
        questions: [
          "What does it mean to you that the Lord is your shepherd?",
          "How have you experienced God's provision in your life?",
          "What 'valley' are you walking through that needs God's comfort?"
        ],
        prayer: "Good Shepherd, thank You for caring for me so tenderly. In times of difficulty, help me to trust in Your provision and protection. Lead me in paths of righteousness for Your name's sake. Amen."
      }
    ]
  },
  {
    id: 'proverbs-wisdom',
    title: "Proverbs for Daily Living",
    description: "Practical wisdom for everyday decisions",
    duration: 21,
    category: "Wisdom",
    difficulty: "Intermediate",
    participants: 2100,
    lessons: [
      {
        id: 'day-1',
        day: 1,
        title: "The Fear of the Lord",
        scripture: "Proverbs 1:7",
        content: "True wisdom begins with reverence for God. This 'fear' is not terror, but a healthy respect and awe for God's holiness and authority.",
        questions: [
          "What does 'fear of the Lord' mean in practical terms?",
          "How does reverence for God change your daily decisions?",
          "Where do you need wisdom in your life right now?"
        ],
        prayer: "Lord, give me a heart that reveres You above all else. Help me to seek wisdom from You in all my decisions. Make me teachable and humble before You. Amen."
      }
    ]
  }
];

export const getUserProgress = async (planId: string): Promise<number> => {
  // In a real app, this would fetch from database
  // For now, return mock progress
  const mockProgress: Record<string, number> = {
    'walking-with-jesus': 12,
    'psalms-of-hope': 0,
    'proverbs-wisdom': 7
  };
  
  return mockProgress[planId] || 0;
};

export const updateLessonProgress = async (planId: string, lessonId: string, completed: boolean): Promise<void> => {
  // In a real app, this would update the database
  console.log(`Lesson ${lessonId} in plan ${planId} marked as ${completed ? 'completed' : 'incomplete'}`);
};

export const getStudyPlanById = (id: string): StudyPlan | undefined => {
  return studyPlansDatabase.find(plan => plan.id === id);
};