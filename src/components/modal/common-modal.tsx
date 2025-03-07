import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'screen';

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  modalSize?: ModalSize;
  title: string;
  subtitle?: string;
  body: React.ReactNode;
  closeTitle?: string;
  submitTitle?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-xl',
  xl: 'max-w-3xl',
  '2xl': 'max-w-6xl',
  screen: 'max-w-[92vw]'
};

export const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  modalSize = 'md',
  title,
  subtitle,
  body,
  closeTitle,
  submitTitle
}) => {
  const widthClass = sizeClasses[modalSize] || modalSize;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${widthClass} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader className=''>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle || ''}</DialogDescription>
          <Separator className='mx-auto w-[95%]' />
        </DialogHeader>

        <div className='py-4'>{body}</div>

        {(closeTitle || submitTitle) && (
          <DialogFooter className='flex justify-end gap-2'>
            {submitTitle && (
              <Button onClick={onSubmit} type='submit'>
                {submitTitle}
              </Button>
            )}
            {closeTitle && (
              <Button variant='outline' onClick={onClose}>
                {closeTitle}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

// confirm modal
{
  /* <Modal
  isOpen={isOpen}
  onClose={handleClose}
  onSubmit={handleConfirm}
  title="Are you sure?"
  body="This action cannot be undone."
  closeTitle="Cancel"
  submitTitle="Confirm"
/> */
}

// view modal
{
  /* <Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="User Details"
  subtitle="Viewing user profile"
  body={<UserProfile />}
  closeTitle="Close"
/> */
}

//form modal
{
  /* <Modal
  isOpen={isOpen}
  onClose={handleClose}
  onSubmit={handleSave}
  title="Add New User"
  subtitle="Fill out the form below"
  body={<UserForm />}
  closeTitle="Cancel"
  submitTitle="Save"
/> */
}
