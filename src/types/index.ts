export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'hr'
  | 'recruiter'
  | 'manager'
  | 'employee'
  | 'intern';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  department: string;
  avatarUrl?: string;
  employeeId?: string;
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
  status: 'In Progress' | 'To Do' | 'In Review' | 'Completed' | 'Overdue';
  project?: string;
  completed?: boolean;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  platform?: string;
  type: 'Meeting' | 'Review' | 'Interview' | 'Deadline' | 'Leave';
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'Active' | 'At Risk' | 'Completed';
  lead?: string;
  dueDate?: string;
}

export interface AttentionItem {
  id: string;
  type: 'leave' | 'task_review' | 'attendance' | 'overdue';
  title: string;
  count: number;
  icon: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  tag: string;
  read: boolean;
}