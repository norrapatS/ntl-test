import { api } from '@/libs/axios'
import type { ICreateApplicationRequest, ICreateApplicationResponse } from '@/types/application.interface'


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
}