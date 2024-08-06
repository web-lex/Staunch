import React from 'react';

interface MyNotificationProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  message: string;
  iconColor?: string;
}

export const My_Notification: React.FC<MyNotificationProps> = ({ icon: Icon, title, message, iconColor = '#55B977' }) => {
  return (
    <div className="w-[20rem] flex gap-4 p-3 rounded-lg bg-white border border-neutral-400">
      <Icon className={`w-5 h-5 mt-1`} style={{ color: iconColor }} />
      <div className="flex flex-col gap-1">
        <p className="font-medium text-[#555]">
          {title}
        </p>
        <p className="text-sm text-[#8e8e8e]">
          {message}
        </p>
      </div>
    </div>
  );
};
