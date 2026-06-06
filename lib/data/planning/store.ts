import type { BoardData } from "./types"

const g = globalThis as unknown as { planningBoardData?: BoardData }

export function getPlanningBoardData(): BoardData | null {
  return g.planningBoardData ?? null
}

export function setPlanningBoardData(data: BoardData): void {
  g.planningBoardData = data
}
