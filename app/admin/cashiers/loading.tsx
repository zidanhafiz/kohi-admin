import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  const tableArray = Array.from({ length: 5 }, (_, i) => i)

  return (
    <div className="w-full p-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Skeleton className="w-full h-[150px]" />
        <Skeleton className="w-full h-[150px]" />
        <Skeleton className="w-full h-[150px] hidden md:block" />
        <Skeleton className="w-full h-[150px] hidden md:block" />
      </div>
      <div>
        <div className="flex gap-6 max-w-[400px] my-10">
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-[150px] h-[40px]" />
        </div>
        <div className="grid gap-y-4 md:gap-y-10">
          {tableArray.map((_, i) => (
            <div key={i} className="flex gap-5 md:gap-10">
              <Skeleton className="w-full h-[40px]" />
              <Skeleton className="w-full h-[40px]" />
              <Skeleton className="w-full h-[40px]" />
              <Skeleton className="w-full h-[40px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading