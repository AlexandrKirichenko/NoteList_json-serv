import { AxiosRequestConfig } from 'axios';
import { NoteItem, NoteList } from '../features/ListFeature/types';
import { requestExecutorCreator } from './helpers';
import { API_DEFAULT_REQUEST_HEADERS, BASE_URL } from './config';

const requestExecutor = requestExecutorCreator(BASE_URL, API_DEFAULT_REQUEST_HEADERS, true);

interface NoteServerItem extends NoteItem {
  id: string;
}

export const fetchNoteList = async (): Promise<NoteList> => {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/notes',
    method: 'get',
  };

  const response = await requestExecutor<NoteServerItem[]>(axiosRequestConfig);

  const noteDataList: NoteList = {};

  response.data.forEach((fetchNoteListResponseItem) => {
    const { id, ...data } = fetchNoteListResponseItem;
    noteDataList[id] = { ...data };
  });

  return noteDataList;
};

export const addNoteItem = async (noteItem: NoteItem): Promise<unknown> => {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: `/notes`,
    method: 'post',
    data: noteItem,
  };

  const response = await requestExecutor<unknown>(axiosRequestConfig);

  return response.data;
};

export const patchNoteItem = async (noteItem: NoteItem, id: string): Promise<unknown> => {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: `/notes/${id}`,
    method: 'put',
    data: noteItem,
  };
  const response = await requestExecutor<unknown>(axiosRequestConfig);

  return response.data;
};
