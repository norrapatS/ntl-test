import { api } from '@/libs/axios'
import type { IApplication, ICreateApplicationRequest, ICreateApplicationResponse } from '@/types/application.interface'


export const applicationService = {
  async create(
    data: ICreateApplicationRequest,
  ): Promise<ICreateApplicationResponse> {
    const response = await api.post<ICreateApplicationResponse>(
      '/applications',
      data,
    )

    return response.data
  },

  async getAll(): Promise<IApplication[]> {
    const response = await api.get<{ data: IApplication[] }>(
      '/admin/applications',
    )

    return response.data.data
  },

  async getByTransactionNo(id: string): Promise<IApplication> {
    const response = await api.get<{ data: IApplication }>(
      `/admin/applications/${id}`,
    )

    return response.data.data
  },
}