export default function cleanDoubleByteChars (str) {
  for (let i = 0, n = str.length; i < n; i+=1) {
    if (str.charCodeAt(i) > 255) {
      return str.substring(0, i)
    }
  }
  return str
}
