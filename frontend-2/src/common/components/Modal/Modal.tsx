import { Button } from "lib/vault-ui";
import styles from "./styles.module.css";
import CloseIcon from "assets/icons/close";
import { useEffect, useRef } from "react";
type Props = {
  children: React.ReactNode;
  open: boolean;
  confirmText?: string;
  cancelText?: string;
  onSubmit?: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  onClose: () => void;
};

const Modal = ({
  open,
  onClose,
  onSubmit,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  if (!open) return null;
  return (
    <div onClick={onClose} ref={modalRef}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalContainer}
      >
        <div className={styles.modalRight}>
          <Button
            className={styles.closeBtn}
            rounded
            color="neutral"
            variant="filled"
            icon={<CloseIcon />}
            onClick={onClose}
          ></Button>
          <div className={styles.content}>{children}</div>
          <div className={styles.btnContainer}>
            <Button onClick={onSubmit} color="primary" variant="filled">
              {confirmText}
            </Button>
            <Button onClick={onClose} color="neutral" variant="filled">
              {cancelText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
