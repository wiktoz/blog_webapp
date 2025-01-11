import { EnvelopeIcon, EnvelopeOpenIcon, BellIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import api from "@/app/utils/api"
import useSWR from "swr"
import { fetcher } from "@/app/utils/fetcher"

const timeAgo = (dateString:string) => {
    const date = new Date(dateString); // Parse the date string
    if (isNaN(date.getTime())) {
      return <span>Invalid date</span>; // Handle invalid dates
    }

    const gmtPlusOneDate = new Date(date.getTime() - 1 * 60 * 60 * 1000);
  
    return (
      <span>{formatDistanceToNow(gmtPlusOneDate, { addSuffix: true })}</span>
    );
  }

const NotificationBell = () => {
    const { data: notifications, error: notificationsError, isLoading: notificationsLoading, mutate } = useSWR<NotificationResponseInterface[]>("/api/notifications/me", fetcher)

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const changeNotificationStatus = async (notificationId:number, status:boolean) => {
        console.log(notificationId)

        const response = await api.post("/api/notifications/read", {
            notification_id: notificationId,
            viewed: status
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        .finally(async () => {
            await mutate()
        })
    }

    const notificationsCount = () => {
        if(!notifications)
            return 0
        return notifications.filter(notification => notification.viewed === false).length
    }

    return(
        <div>
            <div className="relative">
                <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                    <BellIcon width={24} height={24}/>
                </div>

                {
                    notificationsCount() > 0 && 
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                        {notificationsCount()}
                    </div>
                }

                {
                    isOpen && 
                    <div className="absolute right-0 mt-2 w-72 border border-gray-500 rounded-lg">
                        <div>
                        {
                            notifications && notifications.length > 0 ? notifications.map((notification:NotificationResponseInterface) => {
                                return(
                                    <div key={notification.notification_id} className="hover:bg-orange-300 hover:bg-opacity-20 p-3 cursor-pointer rounded-lg">
                                        <div className="flex flex-row gap-3 items-center">
                                            <div>
                                                <div className="bg-[#f87b4a] p-2 rounded-full text-white">
                                                
                                                {
                                                    notification.viewed ?
                                                    <EnvelopeOpenIcon width={18} height={18} onClick={() => changeNotificationStatus(notification.notification_id, false)}/>
                                                    :
                                                    <EnvelopeIcon width={18} height={18} onClick={() => changeNotificationStatus(notification.notification_id, true)}/>
                                                }
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    notification.viewed ?
                                                    <div className="font-semibold">Read</div>
                                                    :
                                                    <div className="font-bold">New Notification</div>
                                                }
                                                {notification.content}
                                            </div>
                                        </div>
                                        <div className="font-semibold text-xs text-right">
                                            {timeAgo(notification.created_at)}
                                        </div>
                                    </div>
                                )
                            })

                            :

                            <div>No notifications</div>
                        }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default NotificationBell