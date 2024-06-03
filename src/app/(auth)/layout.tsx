import { ReactNode } from "react"
import "../globals.css"

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className="h-screen flex justify-center items-center">
      {children}
    </div>
  )
}

export default layout
