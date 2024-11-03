import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Add token to all requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Channel {
  id: number;
  userId: number;
  name: string;
  description: string;
  thumbnail: string;
}

export interface Playlist {
  id: number;
  channelId: number;
  youtubePlaylistId: string;
  name: string;
  description: string;
  startTime: number;
  endTime: number;
}

export const auth = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post<User>('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post<{ user: User; token: string }>('/auth/login', data),
};

export const channels = {
  create: (data: Omit<Channel, 'id' | 'userId'>) =>
    api.post<Channel>('/channels', data),
  get: (id: number) =>
    api.get<Channel & { playlists: Playlist[] }>(`/channels/${id}`),
  list: () =>
    api.get<Channel[]>('/channels'),
  update: (id: number, data: Partial<Omit<Channel, 'id' | 'userId'>>) =>
    api.patch<Channel>(`/channels/${id}`, data),
};

export const playlists = {
  create: (data: Omit<Playlist, 'id'>) =>
    api.post<Playlist>('/playlists', data),
  update: (id: number, data: Partial<Playlist>) =>
    api.patch<Playlist>(`/playlists/${id}`, data),
};