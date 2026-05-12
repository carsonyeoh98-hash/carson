
export interface Message {
  role: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface SidebarLink {
  label: string;
  query: string;
}
