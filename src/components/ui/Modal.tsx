import ModalPortal from './ModalPortal';

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <ModalPortal>
      <div className="fixed left-0 top-0 z-50 bg-modal w-full h-full">{children}</div>
    </ModalPortal>
  );
}
