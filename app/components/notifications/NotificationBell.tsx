import { EnvelopeIcon, EnvelopeOpenIcon, BellIcon } from "@heroicons/react/24/outline"
import { useState, useEffect, useRef } from "react"
import api from "@/app/utils/api"
import useSWR from "swr"
import { fetcher } from "@/app/utils/fetcher"
import { timeAgo } from "@/app/utils/helpers"



const NotificationBell = () => {
    const { data: notifications, error: notificationsError, isLoading: notificationsLoading, mutate } = useSWR<NotificationResponseInterface[]>("/api/notifications/me", fetcher)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // If the click is outside the dropdown and not on the button, close the dropdown
            if (
              dropdownRef.current &&
              !dropdownRef.current.contains(event.target as Node) &&
              buttonRef.current &&
              !buttonRef.current.contains(event.target as Node)
            ) {
              setIsOpen(false);
            }
          };
      
          document.addEventListener('click', handleClickOutside);
          return () => {
            document.removeEventListener('click', handleClickOutside);
          };
      }, [])

    const changeNotificationStatus = async (notificationId:number, status:boolean) => {
        await api.post("/api/notifications/read", {
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
                <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" ref={buttonRef}>
                    <BellIcon width={20} height={20}/>
                </div>

                {
                    notificationsCount() > 0 && 
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                        {notificationsCount()}
                    </div>
                }

                {
                    isOpen && 
                    <div className="absolute right-0 mt-2 w-72 border border-gray-500 rounded-lg bg-[#fffbef]" ref={dropdownRef}>
                        <div>
                        {
                            notifications && notifications.length > 0 ? notifications.map((notification:NotificationResponseInterface) => {
                                return(
                                    <div key={notification.notification_id} className="p-3 cursor-pointer rounded-lg">
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
                                            <div className="hover:opacity-70">
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