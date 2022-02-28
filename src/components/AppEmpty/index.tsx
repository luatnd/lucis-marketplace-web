export const AppEmpty = ({ children }) => {
  return (
    <div className="app-empty">
      <img src="/assets/img/no-data.png" />
      {children}
    </div>
  )
}
