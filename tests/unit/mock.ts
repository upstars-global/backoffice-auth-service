import type { INoteItem } from '../../src/@model/notes'

export const mockNote: INoteItem = {
  id: "3f2a7c2d-8d1f-4a3b-a6b7-123456789abc",
  authorId: "1a2b3c4d-5e6f-7g8h-9i0j-klmnopqrstuv",
  authorLogin: "user482",
  authorName: "User 73",
  authorEmail: "user482@example.com",
  content: "This is a random note with ID 91e2f3a4-b5c6-d7e8-f9g0-h1i2j3k4l5m6",
  isPinned: true,
  createdAt: "2025-02-04T12:34:56.789Z",
  pinnedAt: "2025-02-04T12:34:56.789Z",
  playerId: "5f6e7d8c-9b0a-1a2b-3c4d-5e6f7g8h9i0j",
  type: "IMPORTANT"
}
