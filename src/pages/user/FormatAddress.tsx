export const formatAddress = (id: any,a:number,b:number) => {
  return (
    String(id).slice(0, a) +
    "..." +
    String(String(id).slice(String(id).length - b, String(id).length))
  )
}
