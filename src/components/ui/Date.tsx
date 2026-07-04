import { formatDate } from "@/lib/utils";

export default function Date({ date }: { date: string; }) {
  return(
    <span className='text-sm font-medium text-gray-500'>
      {`${formatDate(date)}`}
    </span>
  )
}