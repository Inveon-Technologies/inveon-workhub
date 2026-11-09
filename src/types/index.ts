export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'hr'
  | 'recruiter'
  | 'manager'
  | 'employee'
  | 'intern';

export type ActiveModule =
  | 'home'
  | 'people'
  | 'work'
  | 'growth'
  | 'calendar'
  | 'chat'
  | 'reports'
  | 'settings';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  department: string;
  avatarUrl?: string;
  employeeId?: string;
  phone?: string;
  joinDate?: string;
  location?: string;
}

export type PresenceStatus = 'working' | 'on_break' | 'not_started' | 'on_leave';

export interface TeamMemberPresence {
  id: string;
  name: string;
  avatar: string;
  status: PresenceStatus;
  role: string;
}

export interface TaskItem {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Completed';
  project?: string;
  completed?: boolean;
  assignee?: string;
  assigneeAvatar?: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  platform?: string;
  type: 'Meeting' | 'Review' | 'Interview' | 'Deadline' | 'Leave';
  attendees?: number;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'Active' | 'At Risk' | 'Completed';
  lead?: string;
  dueDate?: string;
  tasksCount?: number;
}

export interface EmployeeRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Remote';
  avatar: string;
  joinDate: string;
  location: string;
  performanceScore?: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isMe?: boolean;
}

export interface LMSCourse {
  id: string;
  title: string;
  category: 'Engineering' | 'Design' | 'Product' | 'Leadership' | 'Security';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessonsCount: number;
  progress: number;
  instructor: string;
  thumbnail: string;
  description: string;
  completedLessons?: number;
}
