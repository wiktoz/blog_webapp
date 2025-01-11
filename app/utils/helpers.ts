import { formatDistanceToNow } from "date-fns"

export const timeAgo = (dateString:string) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return "Invalid time"
    }

    const gmtPlusOneDate = new Date(date.getTime() - 1 * 60 * 60 * 1000);
  
    return (
      formatDistanceToNow(gmtPlusOneDate, { addSuffix: true })
    )
}