import React from "react"

const Empty = ({
  title = "The page is still under development",
  descr = "Our team is working tirelessly to make this page live!",
}: {
  title?: string | JSX.Element
  descr?: string | JSX.Element
}) => {
  return (
    <div className="text-center">
      {title && (
        <div>
          <strong>{title}</strong>
        </div>
      )}
      {descr && <div className="text-gray-500">{descr}</div>}
    </div>
  )
}

export default Empty
