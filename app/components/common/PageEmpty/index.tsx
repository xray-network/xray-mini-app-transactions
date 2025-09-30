import { BeakerIcon } from "@heroicons/react/24/outline"

export default function PageEmpty() {
  return (
    <div className="text-center pt-10">
      <h1 className="text-2xl font-black mb-2">Coming Soon</h1>
      <p className="mb-10 text-gray-500">Our team is working tirelessly to make this page live!</p>
      <BeakerIcon className="size-25 text-gray-200 dark:text-gray-700 mx-auto" strokeWidth="2" />
    </div>
  )
}
