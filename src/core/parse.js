export function parse(value = '') {
  if (value.startsWith('=') && value.length > 1) {
    try {
      return eval(value.slice(1))
    } catch (e) {
      return value
    }
  }
  return value
}
