export function normalize(data: Array<any>, byKey: string) {
  return data.reduce((res, item) => ({...res, [item[byKey]]: item}), {})
}
