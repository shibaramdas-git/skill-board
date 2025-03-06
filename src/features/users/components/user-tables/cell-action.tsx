'use client';
import { User } from '@/constants/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import {
  ChartNoAxesGantt,
  Ellipsis,
  KeyRound,
  MonitorSmartphone,
  Store,
  UserPen
} from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { MarketsPopup } from './popups/markets-popup';
import { PermissionsPopup } from './popups/permissions-popup';
import { UserStatusPopup } from './popups/user-status-popup';

interface CellActionProps {
  data: User;
}
export default function CellAction({ data }: CellActionProps) {
  const [open, setOpen] = useState({
    markets: false,
    permissions: false,
    user: false
  });
  return (
    <>
      <MarketsPopup
        isOpen={open.markets}
        onClose={() => setOpen({ ...open, markets: false })}
      />
      <PermissionsPopup
        isOpen={open.permissions}
        onClose={() => setOpen({ ...open, permissions: false })}
      />
      <UserStatusPopup
        isOpen={open.user}
        onClose={() => setOpen({ ...open, user: false })}
      />
      <div className='inline-flex gap-2'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className='cell-action-icon'>
                <MonitorSmartphone size='17' />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                {data.userDevices?.[0] &&
                  data.userDevices[0].deviceName.toUpperCase()}
                &nbsp;[
                {data.userDevices?.[0] && data.userDevices[0].deviceId}]
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className='cell-action-icon'>
              <Ellipsis size='17' />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                // dispatch(sendOtpToUser(row.userId));
                toast.success('OTP sent successfully.');
              }}
            >
              <KeyRound size={17} className='mr-3' /> Send OTP
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpen({ ...open, markets: true })}
            >
              <Store size={17} className='mr-3' /> Update markets
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpen({ ...open, permissions: true })}
            >
              <ChartNoAxesGantt size={17} className='mr-3' /> Update permissions
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen({ ...open, user: true })}>
              <UserPen size={17} className='mr-3' /> Updare user status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
