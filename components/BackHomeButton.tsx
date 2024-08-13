import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const BackHomeButton = () => {
  return (
    <Link href='/' className="flex items-center gap-2 my-4 w-fit text-neutral-500">
      <ArrowLeft />
      Back
    </Link>
  )
}

export default BackHomeButton