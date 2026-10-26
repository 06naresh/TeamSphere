
import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

type ConfirmDialogProps = {
  open: boolean;
  employeeName: string;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  open,
  employeeName,
  busy = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      title="Delete employee?"
      description="This action needs your confirmation."
      onClose={onCancel}
    >
      <div className="delete-warning">
        <div className="delete-warning-icon">
          <AlertTriangle size={25} />
        </div>

        <p>
          Are you sure you want to delete <strong>{employeeName}</strong>?
          This cannot be undone.
        </p>
      </div>

      <div className="dialog-actions">
        <button
          className="button button-secondary"
          type="button"
          onClick={onCancel}
          disabled={busy}
        >
          Cancel
        </button>

        <button
          className="button button-danger"
          type="button"
          onClick={onConfirm}
          disabled={busy}
        >
          {busy ? "Deleting..." : "Delete employee"}
        </button>
      </div>
    </Modal>
  );
}
