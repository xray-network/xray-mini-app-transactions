import { Link } from "react-router"

export default function Page404() {
  return (
    <div className="text-center pt-10">
      <h1 className="text-2xl font-black mb-2">Page Not Found</h1>
      <p className="mb-2 text-gray-500">Our team is working tirelessly to make this page live!</p>
      <p className="mb-10">
        <Link to="/">Go back to the homepage</Link>
      </p>
      <img className="max-w-full w-80 mx-auto" src="/pig404.png" title="XRAY/Pig" alt="XRAY/Pig" />
    </div>
  )
}
