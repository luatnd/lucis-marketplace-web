import { appLogger } from "./Logger"
/**
 * Pick and return a random element from array a
 * @param a
 */
export function randomPick(a: any[]): any {
  return a[randInt(0, a.length - 1)]
}

/**
 * Convert array to dict
 *
 * @param {any[]} items Example: [{id: john}, {id: henry}]
 * @param {String} key
 * @returns {{}} Example: {john:{id: john}, henry: {id: henry}}
 */
export function toDict(items: any[], key = "id") {
  const itemsObj = {}
  for (let i = 0, c = items.length; i < c; i++) {
    const item = items[i]
    itemsObj[item[key]] = item
  }

  return itemsObj
}

/**
 * Convert array to dict with advance options
 *
 * @param items
 * @param transformFn(element, index) transform each array elem into object elem
 * @param getKeyFn(element) get dict key from element
 * @param filterFn(element, index) if filterFn was specified, only item that match the filterFn was return to result
 */
export function mapToDict(
  items: any[],
  transformFn,
  getKeyFn,
  filterFn = null
) {
  const itemsObj = {}
  for (let i = 0, c = items.length; i < c; i++) {
    const item = items[i]
    const k = getKeyFn(item)

    if (filterFn) {
      if (filterFn(item, i)) {
        itemsObj[k] = transformFn(item, i)
      }
    } else {
      itemsObj[k] = transformFn(item, i)
    }
  }

  return itemsObj
}

/**
 * rand a int number in range [min..max]
 * @param min int
 * @param max int
 */
export function randInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max + 1))
}

function test_randInt() {
  const r = {}
  for (let i = 0; i < 1e6; i++) {
    const rnd = randInt(0, 10)
    // @ts-ignore
    if (!r[rnd]) r[rnd] = 0
    // @ts-ignore
    r[rnd] += 1
  }
  appLogger.log(r)
}
