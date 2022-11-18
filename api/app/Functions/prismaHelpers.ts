export function toBeAdded<T extends { uuid: string }>(bddPayload: T[], newPayload: string[]) {
  return bddPayload
    .filter((entity) => !newPayload.includes(entity.uuid))
    .map((entity) => ({
      uuid: entity.uuid,
    }));
}

export function toBeDeleted<T extends { uuid: string }>(bddPayload: T[], newPayload: string[]) {
  return bddPayload
    .filter((entity) => newPayload.includes(entity.uuid))
    .map((entity) => ({
      uuid: entity.uuid,
    }));
}
