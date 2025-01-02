'use server'

import { redirect } from 'next/navigation'

import { Board, BoardRequest } from '@/@types/board.typr'
import { boardService } from '@/libs/services/board.service'
import { BoardCreateValidation } from '@/libs/validations/board-create.validation'

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const createBoard = async (_: any, formData: FormData) => {
  const result = await BoardCreateValidation(formData)

  if (!result.success) {
    return {
      data: formData,
      errors: result.error.format()
    }
  }

  const board: BoardRequest = {
    userId: '1',
    name: formData.get('name') as string,
    description: formData.get('description') as string
  }

  const res = await boardService.create(board)

  if (res) {
    redirect(`/boards/${res.id}`)
  }
}

export const updateBoard = async (_: any, formData: FormData) => {
  const result = await BoardCreateValidation(formData)

  if (!result.success) {
    return {
      data: formData,
      errors: result.error.format()
    }
  }

  const boardData: Partial<Board> = {
    id: formData.get('boardId') as string,
    name: formData.get('name') as string
  }

  const res = await boardService.update(boardData)

  if (res) {
    return {
      data: formData,
      errors: null
    }
  }
}

export const deleteBoard = async (boardId: string) => {
  const res = await boardService.delete(boardId)

  if (res) {
    redirect(`/`)
  }
}
