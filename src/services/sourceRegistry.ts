import { resolve } from '@/services/apiClient'
import { sourceRegistry } from '@/mocks/case9104'
import type { SourceDescriptor, SourceName } from '@/types/domain'

export async function getSourceRegistry(): Promise<SourceDescriptor[]> {
  return resolve(() => sourceRegistry, 80)
}

export function findSource(name: SourceName): SourceDescriptor | undefined {
  return sourceRegistry.find((s) => s.name === name)
}
