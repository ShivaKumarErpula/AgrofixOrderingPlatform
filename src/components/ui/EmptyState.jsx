
import React from 'react';
import { PackageOpen } from 'lucide-react';

export function EmptyState({ 
  title, 
  description, 
  icon = <PackageOpen className="h-12 w-12 text-muted-foreground" />,
  action 
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
