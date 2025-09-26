import Dexie, { Table } from 'dexie';

// Define interfaces for our data
export interface DailyScripture {
  id?: number;
  date: string;
  verse: string;
  reference: string;
  commentary?: string;
  prayer?: string;
  relatedScriptures?: string[];
  isRead: boolean;
  createdAt: Date;
}

export interface StudyPlan {
  id?: number;
  title: string;
  description: string;
  duration: number; // days
  lessons: StudyLesson[];
  progress: number;
  isCompleted: boolean;
  createdAt: Date;
}

export interface StudyLesson {
  id: string;
  title: string;
  content: string;
  scriptures: string[];
  isCompleted: boolean;
  completedAt?: Date;
}

export interface UserNote {
  id?: number;
  scriptureRef: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityPost {
  id?: number;
  type: 'prayer' | 'testimony' | 'question' | 'discussion';
  title: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  likes: number;
  replies: number;
  createdAt: Date;
  syncedAt?: Date;
}

export interface AppEvent {
  id?: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  rsvpStatus?: 'yes' | 'no' | 'maybe';
  reminderSet: boolean;
  createdAt: Date;
}

export interface UserBookmark {
  id?: number;
  type: 'scripture' | 'lesson' | 'post' | 'event';
  itemId: string;
  title: string;
  createdAt: Date;
}

// Database class
export class YesuAppDatabase extends Dexie {
  dailyScriptures!: Table<DailyScripture>;
  studyPlans!: Table<StudyPlan>;
  userNotes!: Table<UserNote>;
  communityPosts!: Table<CommunityPost>;
  events!: Table<AppEvent>;
  bookmarks!: Table<UserBookmark>;

  constructor() {
    super('YesuAppDatabase');
    
    this.version(1).stores({
      dailyScriptures: '++id, date, isRead, createdAt',
      studyPlans: '++id, title, isCompleted, createdAt',
      userNotes: '++id, scriptureRef, createdAt',
      communityPosts: '++id, type, author, createdAt',
      events: '++id, date, reminderSet, createdAt',
      bookmarks: '++id, type, itemId, createdAt'
    });
  }
}

// Export a singleton instance
export const db = new YesuAppDatabase();