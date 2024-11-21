import ModalPortal from './ModalPortal';

type Props = {
  children: React.ReactNode;
  size: 'md' | 'lg';
};

export default function Modal({ children, size }: Props) {
  return (
    <ModalPortal>
      <div className="fixed left-0 top-0 z-50 w-full h-full">
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${size == 'lg' ? 'h-[70vh] w-[60vw]' : 'h-[60vh] w-[35vw]'} overflow-y-auto bg-secondary rounded-md border-2 border-deepdark divide-y divide-gray`}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
