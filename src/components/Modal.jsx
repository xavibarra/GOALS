export default function Modal({
  open,
  title,
  onClose,
  children,
  maxWidthClass = "w-[min(1000px,calc(100%-2rem))]",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Panel */}
      <div
        className={[
          "absolute inset-x-0 top-6 mx-auto rounded-2xl border border-brand-border bg-brand-surface shadow-xl overflow-hidden",
          maxWidthClass,
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-brand-border">
          <div className="text-sm font-semibold text-brand-text">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-brand-muted hover:text-brand-text transition cursor-pointer"
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}
